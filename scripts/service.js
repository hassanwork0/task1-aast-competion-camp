const servicesWithDetails = [
    {
        "name": "Apple TV",
        "price_month": "$9.99",
        "price_year": "$99.99",
        "note": "2 months free with annual subscription",
        "description": "Streaming service for original shows and movies"
    },
    {
        "name": "Apple News",
        "price_month": "$12.99",
        "price_year": "$129.99",
        "note": "2 months free with annual subscription",
        "description": "News and magazine subscription service"
    },
    {
        "name": "Apple Music",
        "price_month": "$10.99",
        "price_year": "$109.99",
        "note": "2 months free with annual subscription",
        "description": "Music streaming service"
    },
    {
        "name": "Apple Fitness",
        "price_month": "$9.99",
        "price_year": "$99.99",
        "note": "2 months free with annual subscription",
        "description": "Fitness and workout service"
    },
    {
        "name": "Apple Arcade",
        "price_month": "$6.99",
        "price_year": "$69.99",
        "note": "2 months free with annual subscription",
        "description": "Gaming subscription service"
    },
    {
        "name": "iCloud",
        "price_month": "$0.99",
        "price_year": "$9.99",
        "note": "2 months free with annual subscription (50GB plan)",
        "description": "Cloud storage service"
    }
];

// Store selected services (FIXED: consistent variable name)
let selectedServices = [];

function loadServices() {
    const cardsContainer = document.querySelector('.cards');

    // Load selected services from local storage
    const savedServices = localStorage.getItem('selectedServices');
    if (savedServices) {
        selectedServices = JSON.parse(savedServices);
        console.log("Loaded selected Services from localStorage:", selectedServices);
    } else {
        selectedServices = []; // FIXED: was selectedAddons = []
    }

    if (!cardsContainer) {
        console.error("Cards container not found!");
        return;
    }

    // Clear existing content
    cardsContainer.innerHTML = '';

    // Loop through services and create cards
    servicesWithDetails.forEach((service, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `plane_${index}`;

        card.innerHTML = `
            <img src="./assets/plane/${service.name}.png" alt="${service.name}" class="service_img" onerror="this.src='assets/plane/default.png'">
            <h2>${service.name}</h2>
            <p>${service.price_month} / month</p>
        `;

        // Apply selected styles if service was previously selected
        if (selectedServices.includes(service.name)) {
            card.style.border = '2px solid black';
            card.style.backgroundColor = 'wheat';
            card.classList.add('selected');
        }

        // Add click event to each card
        card.addEventListener('click', function() {
            toggleService(this);
        });

        cardsContainer.appendChild(card);
    });
}

function toggleService(cardElement) {
    const serviceName = cardElement.querySelector('h2').innerText;
    const serviceIndex = selectedServices.indexOf(serviceName); // FIXED: selectedServices not selectedService
    
    // Check if service is already selected
    if (serviceIndex > -1) {
        // Unselect the service
        selectedServices.splice(serviceIndex, 1);
        cardElement.style.border = '';
        cardElement.style.backgroundColor = '';
        cardElement.classList.remove('selected');
        console.log(`${serviceName} unselected`);
    } else {
        // Select the service
        selectedServices.push(serviceName);
        cardElement.style.border = '2px solid black';
        cardElement.style.backgroundColor = 'wheat';
        cardElement.classList.add('selected');
        console.log(`${serviceName} selected`);
    }
    
    // Save to local storage
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    console.log("Saved to localStorage:", selectedServices);
}

// Optional: Function to clear selected services (FIXED: consistent naming)
function clearSelectedServices() {
    selectedServices = [];
    localStorage.removeItem('selectedServices');
    loadServices(); // Reload to update UI (FIXED: was loadservices)
    console.log("All services cleared");
}

// Optional: Function to get selected services
function getSelectedServices() {
    const saved = localStorage.getItem('selectedServices');
    return saved ? JSON.parse(saved) : [];
}

// Optional: Function to remove specific service from localStorage (FIXED: consistent naming)
function removeServiceFromStorage(serviceName) {
    const saved = getSelectedServices();
    const index = saved.indexOf(serviceName);
    if (index > -1) {
        saved.splice(index, 1);
        localStorage.setItem('selectedServices', JSON.stringify(saved)); // FIXED: was selectedservices
        loadServices(); // Reload to update UI (FIXED: was loadservices)
        console.log(`${serviceName} removed from storage`);
    }
}

// Optional: Get selected services with full details
function getSelectedServicesDetails() {
    const selectedNames = getSelectedServices();
    return servicesWithDetails.filter(service => selectedNames.includes(service.name));
}