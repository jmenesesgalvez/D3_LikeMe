-- Active: 1720985866681@@127.0.0.1@5432@likeme

CREATE DATABASE likeme;
CREATE TABLE IF NOT EXISTS posts (id SERIAL, titulo VARCHAR(25), img VARCHAR(1000),
descripcion VARCHAR(255), likes INT);
SELECT * FROM posts;


