create database account;

use account;

create table user(
    id int not null auto_increment primary key,
    name varchar(50) not null,
    email varchar(50) not null,
    password varchar(50) not null
    cpassword varchar(50) not null,
    gender char(10) not null
)auto_increment = 1;