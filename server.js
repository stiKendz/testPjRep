import express from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import http from 'http';
import pg from 'pg';

const app = express();
const SECRET_KEY = 'my_secret_key';

app.use(cors());
app.use(bodyParser.json());

const PORT = 3000;


const { Pool } = pg;
const pool = new Pool({
    user: 'postgres',
    database: 'demopj',
    password: '12345',
    host: 'localhost',
    port: 5432
})


app.get('/', (req, res) => {
    res.send('Какое-то сообщение');
})

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`)
})

pool.connect((err) => {
    if(err) {
        console.error(`Невозможно подключиться к базе данных: ${err.stack}`);
        return;
    }
    console.log('Подключение к базе данных произведено успешно');
});


app.post('/registration', async (req, res) => {
    const {login, password, name, surname, last_name, phone_number, email} = req.body;

    if (!login || !password || !name || !surname || !last_name || !phone_number || !email) {
        return res.status(400).json({emptyInputErrorMessage: 'Все поля должны быть заполнены'});
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const client = await pool.connect();

        try {
            const exitingUser = await client.query('SELECT user_id FROM users_table WHERE email = $1', [email]);
            if (exitingUser.rowCount > 0) {
                return res.status(409).json({exitUserMessage: 'Пользователь с таким адресом электронной почты уже зарегистрирован'})
            }

            const correctEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if(!correctEmailRegex.test(email)) {
                return res.status(401).json({errorEmailMessage: 'Адрес элетронной почты должен содержать @ и . , иметь корректное имя почтового домена'})
            }

            const result = await client.query(
                `INSERT INTO users_table (login, password, name, surname, last_name, phone_number, email) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id`,
                [login, hashedPassword, name, surname, last_name, phone_number, email]
            );

            const userId = result.rows[0].user_id;
            if (login === 'sklad' && password === '123qwe') {
                const role_name = 'admin';
                await client.query(
                    'INSERT INTO roles_table (role_name, user_id) VALUES ($1, $2)',
                    [role_name, userId]
                );
            } else {
                await client.query(
                    'INSERT INTO roles_table (user_id) VALUES ($1)',
                    [userId]
                );
            };

            await client.query(
                'COMMIT'
            );

            res.status(201).json({
                successRegistrationMessage: 'Пользователь успешно зарегистрирован',
                userId: result.rows[0].user_id,
            });
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release()
        }
    } catch (err) {
        console.error('Ошибка при регистрации пользователя:', err.message);
        res.status(500).json({message: 'Ошибка при регистрации пользователя из-зи ошибки на сервере'});
    }
});