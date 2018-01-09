DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, stock_quantity)
VALUES ("Laptop", "Electronics", 6), 
("Speakers", "Audio", 15),
("Headphones", "Audio", 20),
("Playstation", "Gaming", 3),
("Guitar", "Music", 7),
("Television", "Electronics", 5),
("Socks", "Clothing", 10),
("Belt", "Clothing", 10),
("iPad", "Electronics", 20),
("Toaster", "Appliances", 5);

SELECT * FROM products;

