var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

  queryAllProducts();
});

var customer = {
  item_id: 0,
  customer_order: 0
};

function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("Hello, here are the products we are selling:");
    for (var i = 0; i < res.length; i++) {
      console.log(
        res[i].item_id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].stock_quantity
      );
    }
    console.log("-----------------------------------");
    userInput();
  });
}

function queryProductStock(id) {
  connection.query(
    "SELECT stock_quantity FROM products WHERE item_id = ?",
    id,
    function(err, res) {
      for (var i = 0; i < res.length; i++) {
        var stock = res[i].stock_quantity;
      }
      if (stock >= customer.customer_order) {
        console.log("Thank you for your purchase");

        deductInventory(customer.item_id, customer.customer_order, stock);
      } else if (stock < customer.customer_order) {
        console.log("Sorry, we do not have enough of that item in stock");
        userInput();
      }
    }
  );
}

function deductInventory(item_id, customer_order, stock) {
    var newStock = stock - customer_order;
    connection.query("UPDATE products SET stock_quantity="+newStock+" WHERE item_id="+item_id, function(err, res) {
        if (err) throw err;
        
        console.log("Item "+item_id+" successfully updated with a new quantity of "+newStock);
        queryAllProducts();
    });
}

function userInput() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the ID of the product you would like to buy",
        name: "item_id"
      },
      {
        type: "input",
        message:
          "Please enter the quantity of the product you would like to buy",
        name: "customer_order"
      }
    ])
    .then(function(response) {
      customer.item_id = response.item_id;
      customer.customer_order = response.customer_order;

      queryProductStock(response.item_id);
    });
}
