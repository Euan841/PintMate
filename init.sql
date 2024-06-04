CREATE DATABASE IF NOT EXISTS main;
USE main;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);

CREATE TABLE pubs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pubName VARCHAR(50) NOT NULL,
    pubRating INT NULL
);