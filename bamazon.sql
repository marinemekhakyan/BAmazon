DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR (40) NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    price DECIMAL(10,4) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Energy: A Beginner's Guide by Waclav Slim", "Books", 10.84, 10),
("Wireless Bluetooth Earbuds", "Electronics", 47.99, 10),
("LED Floor Lamp", "Furniture", 129.99, 10),
("Cartilage Ear Cuff", "Jewelry", 150.0, 10),
("Lavazza Caffe Espresso", "Grocery", 19.44, 10),
("The Age of Collage Vol.2", "Books", 115.0, 10),
("Thou Shall Not Try Me Women's T-shirt", "Clothing", 28.60, 10),
("Adidas Squad Duffle Bag", "Sports Accessories", 36.99, 10),
("Big Joe Milano Bean Bag", "Furniture", 81.64, 10),
("Teamonk Oolong Tea", "Grocery", 12.49, 10);