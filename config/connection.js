// Setting up the MySQL connection.
// ===============================================================================================================
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "burgers_db",
});
// ===============================================================================================================
// Establish connection.
// ===============================================================================================================
connection.connect((err) => {
	if (err) {
		console.error("Error connecting: " + err.stack);
		return;
	}
	console.log("connected as id " + connection.threadId);
});

// ===============================================================================================================
// Export connection for our ORM to use.
module.exports = connection;
// ===============================================================================================================
