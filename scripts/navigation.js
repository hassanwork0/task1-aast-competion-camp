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
                <input type="text" id="name" name="name" placeholder="John Doe">
            </div>
            <div class="form_group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" placeholder="example@email.com">
            </div>
            <div class="form_group">
                <label for="phone">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="+1 234 567 890">
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

const page4 = '<h1 style="margin-left: 32px;">Summary,</h1>';

let pages = [page1, page2, page3, page4]

function getPageContent(pageNumber) {
    currentPage = pageNumber;
    const box = document.querySelector('#dynamic-content');

    // Clear previous content
    box.innerHTML = ''; // Better way to clear

    for (let i = 0; i < pages.length; i++) {
        if (pageNumber == i + 1) {
            box.insertAdjacentHTML('beforeend', pages[i]);
        }
    }

    if(pageNumber == 2){
        loadServices();
    }else if(pageNumber == 3){
        loadAddons();
    }

    const backBtn = document.getElementById('back');
    const nextBtn = document.getElementById('next');

    if (currentPage < 2) {
        backBtn.style.display = 'none';
        nextBtn.style.display = 'block';
    } else if (currentPage > pages.length - 1) {
        nextBtn.style.display = 'none';
        backBtn.style.display = 'block';

    } else {
        backBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
}

// Wait for DOM to be fully loaded before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    const backBtn = document.getElementById('back');
    const nextBtn = document.getElementById('next');

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
            if (currentPage < pages.length) {
                currentPage++;
                getPageContent(currentPage);
            }
        });
    }


});