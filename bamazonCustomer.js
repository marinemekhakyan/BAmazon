var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    listProducts();
});

function listProducts() {
    connection.query("SELECT * FROM products ORDER BY product_name ASC", function (err, results) {
        if (err) throw err;
        console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>");
        console.log("Available items: ");
        for (var i = 0; i < results.length; i++) {
            console.log("\nID - " + results[i].item_id + "\nProduct Name - " + results[i].product_name + "\nPrice - " + "$" + results[i].price);
            console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>");
            var price = results[i].price;
        }
        pickItem();
    });
}

function pickItem() {
    inquirer.prompt([{
        name: "cSelection",
        type: "input",
        message: "Welcome! We B Amazon:) Please select an item by its ID. [Quit with Q]",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            console.log("Please make sure you're providing the right item ID.");
            return false;
        }
    },
    {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            console.log("<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>")
            console.log("Please provide a number.");
            return false;
        }
    }
    ]).then
        (function (answers) {
            var customerSelect = answers.cSelection;
            var quantity = answers.quantity;
            connection.query(
                "SELECT * FROM products WHERE item_id = " + answers.cSelection, function (err, results) {
                    if (err) throw err;
                    var result = results[0]
                    var price = result.price;
                    if (quantity > results[0].stock_quantity) {
                        console.log("Sorry, we don't have that many in stock. Try a smaller quantity! [Quit with Q]")
                        end();
                        return;
                    }
                    else {
                        updateStock(price, quantity, customerSelect);
                    }
                });
        });
}

function updateStock(price, quantity, customerSelect) {
    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity, customerSelect], function (err, results) {
        if (err) throw err;
        console.log("Thank you for your purchase! Your total is $" + price * quantity);
        end();
    });
}

function end() {
    connection.end();
}

