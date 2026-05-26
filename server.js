// Import the required libraries for the server
const express = require("express");
const path = require("path");

// Create the Express application instance
// Express simplifies routing and handling HTTP requests
const app = express();

// Import the database connection from database.js
// This allows the server to query the MySQL gamestore database
const connection = require("./database");

// Allow the server to read JSON data sent from the browser
// This is needed to process cart actions (add/remove items)
app.use(express.json());

// Serve all static files (HTML, CSS, JS, images) from the public folder
// Any file inside /public is automatically accessible in the browser
app.use(express.static(path.join(__dirname, "public")));

// Route: Home page
// When the user visits localhost:3000, send the index.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route: Get all products from the database
// The browser fetches this to display the games on the products page
app.get("/api/products", (req, res) => {
    let sql = "SELECT * FROM products";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.send(results);
    });
});

// Route: Add a product to the cart
// Receives the product_id, name and price from the browser
app.post("/api/cart", (req, res) => {
    const { product_id, name, price } = req.body;
    let sql = "INSERT INTO cart (product_id, name, price, quantity) VALUES (?, ?, ?, 1)";
    connection.query(sql, [product_id, name, price], function(err, results) {
        if (err) throw err;
        res.send({ message: "Product added to cart!" });
    });
});

// Route: Get all items currently in the cart
app.get("/api/cart", (req, res) => {
    let sql = "SELECT * FROM cart";
    connection.query(sql, function(err, results) {
        if (err) throw err;
        res.send(results);
    });
});

// Route: Remove an item from the cart by its ID
app.delete("/api/cart/:id", (req, res) => {
    let sql = "DELETE FROM cart WHERE id = ?";
    connection.query(sql, [req.params.id], function(err, results) {
        if (err) throw err;
        res.send({ message: "Item removed from cart!" });
    });
});

// Start the server and connect to the database on port 3000
app.listen(3000, () => {
    connection.connect((err) => {
        if (err) throw err;
        console.log("Database connected!");
    });
    console.log("App running on http://localhost:3000");
});