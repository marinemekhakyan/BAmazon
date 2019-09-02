var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    listProducts();
});

function listProducts() {
    connection.query("SELECT * FROM products ORDER BY product_name", function (err, results) {
        if (err) throw err;
        console.log("----------------------------");
        console.log("Available items: ");
        for (var i = 0; i < results.length; i++) {
            console.log("\nID - " + results[i].item_id + "\nProduct Name - " + results[i].product_name + "\nPrice - " + "$" + results[i].price);
            console.log("------------------------------");
        }
        pickItem();
    });
}

// function pickItem() {
//     inquirer.prompt({
//         name: 
//     })
// }