const toMainPageButton = document.querySelector('.to_main_page');
const toSingginButton = document.querySelector('.singin');
const toSingupButton = document.querySelector('.singup');
const toOffersButton = document.querySelector('.offers');
const toCatalogueButton = document.querySelector('.to-catalogue');
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

if (toCatalogueButton) {
    toCatalogueButton.addEventListener('click', () => {
        const token = window.localStorage.getItem('token');

        if (!token) {
            return alert('Вы не вошли в свой аккаунт');
        } else {
            window.location.href = './catalogue.html';
        }
    });
};

if (toOffersButton) {
    toOffersButton.addEventListener('click', () => {
        const token = window.localStorage.getItem('token');

        if (!token) {
            return alert('Необходимо войти в аккаунт');
        } else {
            window.location.href = './offers.html';
        }
    });
};

if (toAdminpageButton) {
    toAdminpageButton.addEventListener('click', () => {
        const token = window.localStorage.getItem('token');
        const role = window.localStorage.getItem('role');

        if (!token) {
            return alert('Необходимо войти в аккаунт');
        } else if (role !== 'Администратор') {
            return alert('Вы не являетесь администратором')
        } else {
            window.location.href='./admin.html';
        }
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

            if (data.exitUserMessage) {
                alert('Пользователь с таким адресом электронной почты уже зарегистрирован');
            }

            if (data.errorEmailMessage) {
                alert('Введите корректный адрес электронной почты');
            }

            if (data.exitUserLoginMessage) {
                alert('Введенный логин уже занят, придумайте другой');
            }

            if (data.successRegistrationMessage) {
                alert('Вы успешно зарегистрировались');
            }
    
            console.log(data);
        });
    };


const singInButton = document.querySelector('.singin-button');
if (singInButton) {
        singInButton.addEventListener('click', async () => {
            const login = document.querySelector('.input-login').value;
            const password = document.querySelector('.input-password').value;
        
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login, password })
            });
        
            const data = await response.json();

            if (data.emptyInputErrorMessage) {
                alert('Все поля должны быть заполнены');
            }

            if (data.failedLoginOrPasswordMessage || data.noValidPasswordMessage) {
                alert('Неверный логин или пароль');
            }

            if (data.successLoginMessage) {
                alert(data.successLoginMessage);

                window.localStorage.setItem('token', data.token);
                window.localStorage.setItem('login', data.login);
                window.localStorage.setItem('role', data.role);
            }
    
            console.log(data);
        });
    };