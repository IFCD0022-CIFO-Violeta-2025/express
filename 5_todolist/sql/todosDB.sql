drop database if exists todos;
create database todos;
use todos;

CREATE TABLE IF NOT EXISTS `todos`(
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `completed` TINYINT NOT NULL,
  `priority` ENUM("high", "medium", "low") NOT NULL,
  `createAt` DATETIME NOT NULL DEFAULT current_timestamp,
  `updateAt` DATETIME NOT NULL DEFAULT current_timestamp on update current_timestamp,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

insert into todos (title) values ("dato 1");