let currentPage = 1;

const page1 = `
    <form class="box_form_container" id="form_container">
        <div>
            <h1>welcome, </h1>
            <p>Please Fill the following information</p>
        </div>
        <div class="form_groups_container">
            <div class="form_group">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" placeholder="John Doe" required>
            </div>
            <div class="form_group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="example@email.com" required>
            </div>
            <div class="form_group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="+1 234 567 890" required>
            </div>
        </div>
    </form>
`;

const page2 = `
 <div class="plane" id="plane">
                    <div class="plane_title">
                        <h1>Choose your plan,</h1>
                        <p>you have to select monthly or permanent subscription</p>
                    </div>
                    <div class="cards" id="cards">

                    </div>
                </div>`;

const page3 = `<div class="addons_title">
                <h1>Pick Addon to your Order,</h1>
                <p>Special Items for you.</p>
                </div>
                <div class="addons_container" id="addons-container">

                </div>`;

const page4 = `
                <div class="summary_container">
                <div class="selected_planes">
                <h2>ٍSelected Planes : </h2>
                
                </div>
                <div class="selected_addons">
                    <h2>Selected Addons :</h2>
                </div>
                <div class="calculated price"></div>
                <div class="button_group">
                <button type="button" class="btn_back" id="back">Go Back</button>
                <button type="button" class="btn_next" id="next">Finish</button>

                </div>
            </div>
        
`;

let pages = [page1, page2, page3, page4]


function getPageContent(pageNumber) {
    currentPage = pageNumber;
    const box = document.querySelector('#dynamic-content');

    // Clear previous content
    box.innerHTML = '';

    for (let i = 0; i < pages.length; i++) {
        if (pageNumber == i + 1) {
            box.insertAdjacentHTML('beforeend', pages[i]);
        }
    }
    if(pageNumber == 1){

    }else if(pageNumber == 2){
        loadServices();
    }else if(pageNumber == 3){
        loadAddons();
    }else if(pageNumber == 4){
        loadSummary();
    }

    const backBtn = document.getElementById('back');
    const nextBtn = document.getElementById('next');
    const finishBtn = document.getElementById('finish');
    
    if (currentPage < 2) {
        if (backBtn) backBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'block';
        if (finishBtn) finishBtn.style.display = 'none';
    } else if (currentPage > pages.length - 1) {
        if (nextBtn) nextBtn.style.display = 'none';
        if (backBtn) backBtn.style.display = 'block';
        if (finishBtn) finishBtn.style.display = 'block';
    } else {
        if (backBtn) backBtn.style.display = 'block';
        if (nextBtn) nextBtn.style.display = 'block';
        if (finishBtn) finishBtn.style.display = 'none';
    }
}

// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    const backBtn = document.getElementById('back');
    const nextBtn = document.getElementById('next');
    const finishBtn = document.getElementById('finish');

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                getPageContent(currentPage);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            // Check if we're on page 1 and validate form fields
            if (currentPage === 1) {
                if (validatePage1()) {
                    // All fields are filled, proceed to next page
                    if (currentPage < pages.length) {
                        currentPage++;
                        getPageContent(currentPage);
                    }
                }
                // If validation fails, don't proceed
            } else {
                // For other pages, just proceed normally
                if (currentPage < pages.length) {
                    currentPage++;
                    getPageContent(currentPage);
                }
            }
        });
    }

    if (finishBtn) {
        finishBtn.addEventListener('click', () => {
            const box = document.querySelector('#dynamic-content');
            nextBtn.style.display = 'none';
            backBtn.style.display = 'none';
            finishBtn.style.display = 'none';
            
            box.innerHTML = `
                <div class="finish-container">
                    <div class="checkmark-wrapper">
                        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                            <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="#4caf50" stroke="#4caf50" stroke-width="4"/>
                            <text x="26" y="36" text-anchor="middle" fill="white" font-size="32" font-weight="bold">✓</text>
                        </svg>
                    </div>
                    <h2 class="thankyou-title">Thank You!</h2>
                    <p class="thankyou-message">Your purchase has been completed successfully.</p>
                    <p class="thankyou-submessage">We appreciate your business and hope to see you again soon!</p>
                </div>
            `;
        });
    }
});

// Function to validate page 1 form fields
function validatePage1() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    
    let isValid = true;
    let errorMessage = '';
    
    // Name validation: length >= 3
    if (!name || !name.value.trim()) {
        isValid = false;
        errorMessage += 'Please enter your name.\n';
        if (name) name.style.border = '2px solid red';
    } else if (name.value.trim().length < 3) {
        isValid = false;
        errorMessage += 'Name must be at least 3 characters long.\n';
        if (name) name.style.border = '2px solid red';
    } else if (name) {
        name.style.border = '';
    }
    
    // Email validation: anystring@anystring.anystring
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !email.value.trim()) {
        isValid = false;
        errorMessage += 'Please enter your email address.\n';
        if (email) email.style.border = '2px solid red';
    } else if (!emailRegex.test(email.value.trim())) {
        isValid = false;
        errorMessage += 'Please enter a valid email address (e.g., name@domain.com).\n';
        if (email) email.style.border = '2px solid red';
    } else if (email) {
        email.style.border = '';
    }
    
    // Phone validation: starts with + followed by numbers (at least 1 digit after +)
    const phoneRegex = /^\+\d+$/;
    if (!phone || !phone.value.trim()) {
        isValid = false;
        errorMessage += 'Please enter your phone number.\n';
        if (phone) phone.style.border = '2px solid red';
    } else if (!phoneRegex.test(phone.value.trim())) {
        isValid = false;
        errorMessage += 'Please enter a valid phone number starting with + (e.g., +1234567890).\n';
        if (phone) phone.style.border = '2px solid red';
    } else if (phone) {
        phone.style.border = '';
    }

    
    return isValid;
}