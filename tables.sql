CREATE TABLE users_table (
	user_id serial primary key,
	login varchar(128) not null,
	password varchar(128) not null,
	name varchar(64) not null,
	surname varchar(64) not null,
	last_name varchar(64) not null,
	phone_number varchar(64) null,
	email varchar(64) unique not null
);

CREATE TABLE roles_table (
	role_id serial primary key,
	role_name varchar(64) not null default 'Пользователь',
	user_id int unique, -- 1
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade -- связь 1 к 1 users_table (user_id)
);

CREATE TABLE offers_table (
	offer_id serial primary key,
	image bytea null,
	name varchar(64) not null,
	price int not null
);

CREATE TABLE users_offers (
	user_id int,
	offer_id int,
	offer_kolvo int not null,
	user_adress varchar(256) not null,
	status varchar(64) not null default 'В обработке',
	foreign key (user_id) references users_table (user_id) on delete cascade on update cascade,
	foreign key (offer_id) references offers_table (offer_id) on delete cascade on update cascade,
	primary key (user_id, offer_id)
);


INSERT INTO users_table (login, password, name, surname, last_name, phone_number, email) VALUES
('ivanov', 'qwerty123', 'Иван', 'Иванов', 'Иванович', '+79161234567', 'ivanov@mail.ru'),
('petrov', 'asdfgh456', 'Пётр', 'Петров', 'Петрович', '+79162345678', 'petrov@gmail.com'),
('sidorova', 'zxcvbn789', 'Мария', 'Сидорова', 'Сергеевна', '+79163456789', 'sidorova@yandex.ru'),
('smirnov', '123456qwe', 'Алексей', 'Смирнов', 'Алексеевич', '+79164567890', 'smirnov@mail.com'),
('kuznetsova', 'qazwsxedc', 'Елена', 'Кузнецова', 'Дмитриевна', '+79165678901', 'kuznetsova@gmail.ru');

INSERT INTO roles_table (user_id) VALUES
(1),
(2),
(3),
(4),
(5);

INSERT INTO offers_table (image, name, price) VALUES
(NULL, 'Ноутбук HP', 45000),
(NULL, 'Смартфон Samsung', 32000),
(NULL, 'Наушники Sony', 8500),
(NULL, 'Планшет Lenovo', 28000),
(NULL, 'Фитнес-браслет', 3500);

INSERT INTO users_offers (user_id, offer_id, offer_kolvo, user_adress) VALUES
(1, 1, 1, 'ул. Ленина, д.10, кв.25'),
(1, 3, 2, 'ул. Ленина, д.10, кв.25'),
(2, 2, 1, 'пр. Мира, д.15, кв.12'),
(3, 4, 1, 'ул. Гагарина, д.5, кв.33'),
(4, 5, 3, 'ул. Садовая, д.20, кв.7');

SELECT * FROM users_table;
SELECT * FROM roles_table;
SELECT * FROM offers_table;
SELECT * FROM users_offers;

DELETE FROM users_table WHERE user_id = 6;