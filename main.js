const toMainPageButton = document.querySelector('.to_main_page');
const toSingginButton = document.querySelector('.singin');
const toSingupButton = document.querySelector('.singup');
const toOffersButton = document.querySelector('.offers');
const toAdminpageButton = document.querySelector('.adminpage');

if (toMainPageButton) {
    toMainPageButton.addEventListener('click', () => {
        window.location.href = './mainpage.html';
    });
};

if (toSingginButton) {
    toSingginButton.addEventListener('click', () => {
        window.location.href = './singin.html';
    });
};

if (toSingupButton) {
    toSingupButton.addEventListener('click', () => {
        window.location.href = './singup.html';
    });
};

if (toOffersButton) {
    toOffersButton.addEventListener('click', () => {
        window.location.href = './offers.html';
    });
};

if (toAdminpageButton) {
    toAdminpageButton.addEventListener('click', () => {
        window.location.href = './admin.html';
    });
};