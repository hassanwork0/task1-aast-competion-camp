function loadSummary() {
    const summaryContainer = document.querySelector('.summary_container');
    if (!summaryContainer) {
        console.error("Summary container not found!");
        return;
    }

    // Get selected services from localStorage
    const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
    // Get selected addons from localStorage
    const selectedAddons = JSON.parse(localStorage.getItem('selectedAddons') || '[]');

    // Get full details of selected services
    const servicesDetails = servicesWithDetails.filter(service => 
        selectedServices.includes(service.name)
    );

    // Get full details of selected addons
    const addonsDetails = addons.filter(addon => 
        selectedAddons.includes(addon.name)
    );

    // Calculate totals
    let servicesTotalMonthly = 0;
    let servicesTotalYearly = 0;
    let addonsTotal = 0;

    // Create HTML for selected services (using same card style as addons)
    let servicesHTML = '';
    if (servicesDetails.length > 0) {
        servicesDetails.forEach(service => {
            const monthlyPrice = parseFloat(service.price_month.replace('$', ''));
            const yearlyPrice = parseFloat(service.price_year.replace('$', ''));
            servicesTotalMonthly += monthlyPrice;
            servicesTotalYearly += yearlyPrice;
            
            // Using the same card design as addons
            servicesHTML += `
                <div class="summary-card">
                    <img src="./assets/plane/${service.name}.png" 
                         alt="${service.name}" 
                         class="summary-card-img" 
                         onerror="this.src='assets/plane/default.png'">
                    <div class="summary-card-info">
                        <h3>${service.name}</h3>
                        <p>${service.description}</p>
                        ${service.note ? `<p class="card-note">${service.note}</p>` : ''}
                    </div>
                    <div class="summary-card-price">
                        <p>${service.price_month}<span class="price-period">/month</span></p>
                        <p class="yearly-price">${service.price_year}<span class="price-period">/year</span></p>
                    </div>
                </div>
            `;
        });
    } else {
        servicesHTML = '<div class="empty-message">No services selected yet.</div>';
    }

    // Create HTML for selected addons (using the same card design)
    let addonsHTML = '';
    if (addonsDetails.length > 0) {
        addonsDetails.forEach(addon => {
            const addonPrice = parseFloat(addon.price.replace('$', ''));
            addonsTotal += addonPrice;
            
            // Original addon card design
            addonsHTML += `
                <div class="summary-card">
                    <img src="./assets/addons/${addon.name}.png" 
                         alt="${addon.name}" 
                         class="summary-card-img" 
                         onerror="this.src='assets/addons/default.png'">
                    <div class="summary-card-info">
                        <h3>${addon.name}</h3>
                        <p>${addon.description}</p>
                    </div>
                    <div class="summary-card-price">
                        <p>${addon.price}<span class="price-period"> one-time</span></p>
                    </div>
                </div>
            `;
        });
    } else {
        addonsHTML = '<div class="empty-message">No add-ons selected yet.</div>';
    }

    // Create the complete summary HTML
    const summaryHTML = `
        <div class="summary">
            <h1 class="summary-title">Summary</h1>
            
            <div class="summary-section">
                <h2 class="section-title">Selected Planes</h2>
                <div class="summary-cards-list">
                    ${servicesHTML}
                </div>
            </div>

            <div class="summary-section">
                <h2 class="section-title">Selected Addons</h2>
                <div class="summary-cards-list">
                    ${addonsHTML}
                </div>
            </div>

          
        </div>
    `;

    summaryContainer.innerHTML = summaryHTML;

    // Change the next button to "Finish" when on summary page
    const nextBtn = document.getElementById('next');
    const backBtn = document.getElementById('back');
    
    if (nextBtn) {
        nextBtn.textContent = 'Finish';
        // Remove existing listeners and add new one
        const newNextBtn = nextBtn.cloneNode(true);
        nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
        newNextBtn.addEventListener('click', finishOrder);
    }
    
    if (backBtn) {
        const newBackBtn = backBtn.cloneNode(true);
        backBtn.parentNode.replaceChild(newBackBtn, backBtn);
        newBackBtn.addEventListener('click', () => {
            currentPage = 3;
            getPageContent(currentPage);
            // Reset button text when going back
            const resetNextBtn = document.getElementById('next');
            if (resetNextBtn) {
                resetNextBtn.textContent = 'Next Step';
            }
        });
    }
}

function finishOrder() {
    const selectedServices = JSON.parse(localStorage.getItem('selectedServices') || '[]');
    const selectedAddons = JSON.parse(localStorage.getItem('selectedAddons') || '[]');
    
    // Get user info from page1
    const userName = document.getElementById('name')?.value || localStorage.getItem('userName') || 'Guest';
    const userEmail = document.getElementById('email')?.value || localStorage.getItem('userEmail') || 'Not provided';
    
    // Save user info to localStorage
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
    
    // Calculate totals
    let servicesTotal = 0;
    let addonsTotal = 0;
    
    servicesWithDetails.forEach(service => {
        if (selectedServices.includes(service.name)) {
            servicesTotal += parseFloat(service.price_month.replace('$', ''));
        }
    });
    
    addons.forEach(addon => {
        if (selectedAddons.includes(addon.name)) {
            addonsTotal += parseFloat(addon.price.replace('$', ''));
        }
    });
    
    // Create order object
    const order = {
        orderId: 'ORD-' + Date.now(),
        date: new Date().toLocaleString(),
        customer: {
            name: userName,
            email: userEmail
        },
        services: selectedServices,
        addons: selectedAddons,
        servicesTotal: servicesTotal,
        addonsTotal: addonsTotal,
        totalDue: servicesTotal + addonsTotal
    };
    
    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Show success message
    alert(`✅ Order Completed Successfully!\n\nOrder ID: ${order.orderId}\nCustomer: ${userName}\n\n📦 Services: $${servicesTotal.toFixed(2)}/month\n🎁 Add-ons: $${addonsTotal.toFixed(2)} one-time\n💰 Total Due Today: $${(servicesTotal + addonsTotal).toFixed(2)}\n\nThank you for your purchase! 🎉`);
    
    // Ask if user wants to start a new order
    if (confirm("Would you like to start a new order?")) {
        // Clear selections
        localStorage.removeItem('selectedServices');
        localStorage.removeItem('selectedAddons');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        
        // Reset to page 1
        currentPage = 1;
        getPageContent(currentPage);
        
        // Reset button text
        const nextBtn = document.getElementById('next');
        if (nextBtn) {
            nextBtn.textContent = 'Next Step';
        }
    }
}