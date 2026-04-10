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

function loadServices() {
    const cardsContainer = document.querySelector('.cards'); // Assuming you have a div with class "cards"
    
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
        
        cardsContainer.appendChild(card);
    });
}

