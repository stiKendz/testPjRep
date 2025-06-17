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


const singUpButton = document.querySelector('.singup-button');
if (singUpButton) {
        singUpButton.addEventListener('click', async () => {
            const login = document.querySelector('.input-login').value;
            const password = document.querySelector('.input-password').value;
            const name = document.querySelector('.input-name').value;
            const surname = document.querySelector('.input-surname').value;
            const last_name = document.querySelector('.input-lastname').value;
            const phone_number = document.querySelector('.input-phone').value;
            const email = document.querySelector('.input-email').value;
        
            const response = await fetch('http://localhost:3000/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password, name, surname, last_name, phone_number, email })
            });
        
            const data = await response.json();

            if (data.emptyInputErrorMessage) {
                alert('Все поля должны быть заполнены');
            }

            if (data.errorEmailMessage) {
                alert('Введите корректный адрес электронной почты');
            }

            if (data.successRegistrationMessage) {
                alert('Вы успешно зарегистрировались');
            }
    
            console.log(data);
        });
    };