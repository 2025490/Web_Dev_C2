// Import the mysql2 library to allow database connection
var mysql = require("mysql2");

// Create a connection to the MySQL database using the store credentials
// This connection allows the server to fetch and update product and cart data
var connection = mysql.createConnection({
    host: "localhost",        // The database is running on this local machine
    database: "gamestore",   // The name of the database we created
    user: "root",            // Default MySQL username
    password: "Teteus@12", // My MySQL password
    connectionLimit: 10      // Maximum number of simultaneous connections allowed
});

// Export the connection so it can be used in server.js
module.exports = connection;