// Import MySQL connection.
// =====================================================================================
const connection = require("../config/connection.js");
// =====================================================================================
// ORM Functions
// =====================================================================================
// Prepare to help with SQL stntax.
// =====================================================================================
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		var value = ob[key];

		if(Object.hasOwnProperty.call(ob, key)) {

			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
			}

			arr.push(key + "=" + value);
		}
	}

	return arr.toString();
}
// =====================================================================================
// ORM functions
// =====================================================================================
const orm = {
	selectAll: (tableInput, cb) => {
		let queryString = "SELECT * FROM " + tableInput + ";";
		connection.query(queryString, (err, result) => {
			if (err) { throw err };

			cb(result);
		});
	},
	insertOne: (table, cols, vals, cb) => {
		let queryString = "INSERT INTO " + table;
	
		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		console.log(queryString);

		connection.query(queryString, vals, (err, result) => {
			if(err) { throw err };

			cb(result);
		})
	},
	updateOne: (table, objColVals, condition, cb) => {
		let queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);
		connection.query(queryString, (err, result) => {
			if (err) { throw err };

			cb(result);
		})
	}

};
// =====================================================================================
// Export for use on the model
// =====================================================================================
module.exports = orm;
// =====================================================================================