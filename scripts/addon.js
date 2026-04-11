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

let selectedAddons = [];

function loadAddons() {
    console.log("loadAddons called");
    
    // Load selected addons from local storage
    const savedAddons = localStorage.getItem('selectedAddons');
    if (savedAddons) {
        selectedAddons = JSON.parse(savedAddons);
        console.log("Loaded selected addons from localStorage:", selectedAddons);
    } else {
        selectedAddons = [];
    }
    
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
        
        // Check if this addon is already selected and apply styles
        if (selectedAddons.includes(addonItem.name)) {
            addon.style.border = '2px solid black';
            addon.style.backgroundColor = 'wheat';
            addon.classList.add('selected');
        }
        
        addon.addEventListener('click', (function() {
            return function() {
                toggleAddon(this);
            };
        })());
        
        addonsContainer.appendChild(addon);
    });
}

function toggleAddon(addonElement) {
    const addonName = addonElement.querySelector('h3').innerText;
    const addonIndex = selectedAddons.indexOf(addonName);
    
    // Check if addon is already selected
    if (addonIndex > -1) {
        // Unselect the addon
        selectedAddons.splice(addonIndex, 1);
        addonElement.style.border = '';
        addonElement.style.backgroundColor = '';
        addonElement.classList.remove('selected');
        console.log(`${addonName} unselected`);
    } else {
        // Select the addon
        selectedAddons.push(addonName);
        addonElement.style.border = '2px solid black';
        addonElement.style.backgroundColor = 'wheat';
        addonElement.classList.add('selected');
        console.log(`${addonName} selected`);
    }
    
    // Save to local storage
    localStorage.setItem('selectedAddons', JSON.stringify(selectedAddons));
    console.log("Saved to localStorage:", selectedAddons);
}

// Optional: Function to clear selected addons
function clearSelectedAddons() {
    selectedAddons = [];
    localStorage.removeItem('selectedAddons');
    loadAddons(); // Reload to update UI
    console.log("All addons cleared");
}

// Optional: Function to get selected addons
function getSelectedAddons() {
    const saved = localStorage.getItem('selectedAddons');
    return saved ? JSON.parse(saved) : [];
}

// Optional: Function to remove specific addon from localStorage
function removeAddonFromStorage(addonName) {
    const saved = getSelectedAddons();
    const index = saved.indexOf(addonName);
    if (index > -1) {
        saved.splice(index, 1);
        localStorage.setItem('selectedAddons', JSON.stringify(saved));
        loadAddons(); // Reload to update UI
        console.log(`${addonName} removed from storage`);
    }
}