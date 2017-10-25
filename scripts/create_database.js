var mysql = require('mysql');
var dbconfig = require('../config/database');

var connection = mysql.createConnection(dbconfig.connection);

connection.query('CREATE DATABASE ' + dbconfig.database);

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.users_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `username` VARCHAR(20) NOT NULL, \
    `name` VARCHAR(20) NOT NULL, \
    `password` CHAR(60) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC), \
    UNIQUE INDEX `username_UNIQUE` (`username` ASC) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.documents_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `date` DATE NOT NULL, \
    `folio` VARCHAR(20) NOT NULL, \
    `buyer` VARCHAR(20) NOT NULL, \
    `total` INT NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

connection.query('\
CREATE TABLE `' + dbconfig.database + '`.`' + dbconfig.details_table + '` ( \
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT, \
    `document_id` INT NOT NULL, \
    `unit` INT NOT NULL, \
    `price` INT NOT NULL, \
    `quantity` INT NOT NULL, \
    `subtotal` INT NOT NULL, \
    `description` VARCHAR(100) NOT NULL, \
        PRIMARY KEY (`id`), \
    UNIQUE INDEX `id_UNIQUE` (`id` ASC) \
)');

console.log('Success: Database Created!')

connection.end();
