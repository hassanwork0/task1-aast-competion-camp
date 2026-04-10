const addons = [
    {
        "name": "Final Cut Pro",
        "description": "Professional video editing software with advanced color grading, 360° video editing, and HDR support",
        "price": "$299.99"
    },
    {
        "name": "Logic Pro",
        "description": "Complete professional music production toolkit for composing, recording, editing, and mixing",
        "price": "$199.99"
    },
    {
        "name": "Apple Compressor",
        "description": "High-performance video encoding and compression tool for professional media delivery",
        "price": "$49.99"
    }
];

function loadAddons() {
    console.log("loadAddons called");
    const addonsContainer = document.querySelector('.addons_container');
    
    if (!addonsContainer) {
        console.error("Addons container not found!");
        return;
    }
    
    // Clear existing content
    addonsContainer.innerHTML = '';
    
    addons.forEach((addonItem, index) => { 
        const addon = document.createElement('div');
        addon.className = 'addon';
        addon.id = `addon${index}`;
        
        
        addon.innerHTML = `
            <img src="./assets/addons/${addonItem.name}.png" alt="${addonItem.name}" class="addon_img" onerror="this.src='assets/addons/default.png'">
            <h3 class="addon_info">${addonItem.name}</h3>
            <p class="addon_info">${addonItem.description}</p>
            <p class="addon_price">${addonItem.price}</p>
        `;
        
        addonsContainer.appendChild(addon);
    });
    
}
