drop database if exists test;
create database test;
use test;

create table crud (
    id int primary key auto_increment,
    dato varchar(255) not null,
    creado datetime default current_timestamp,
    actualizado datetime default current_timestamp on update current_timestamp
);

insert into crud (dato) values ("dato 1");