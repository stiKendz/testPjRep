const toMainPageButton = document.querySelector('.to_main_page');

if (toMainPageButton) {
    toMainPageButton.addEventListener('click', () => {
        window.location.href = './mainpage.html';
    });
};