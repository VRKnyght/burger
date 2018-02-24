// Import the ORM to create the functions that will interact with the database.
// ======================================================================================================
const orm = require("../config/orm.js");
// ======================================================================================================
// Burger will be controlled here
// ====================================================================================================== 
const burger =  {
	all: (cb)=> {
		orm.selectAll("burgers", (res)=> {
			cb(res);
		});
	},
	create: (cols, vals, cb)=> {
		orm.insertOne("burgers", cols, vals, (res)=> {
			cb(res);
		});
	},
	update: (objColVals, condition, cb)=> {
		orm.updateOne("burgers", objColVals, condition, (res)=> {
			cb(res);
		});
	}
};
// ======================================================================================================
// Export for the controller
// ======================================================================================================
module.exports = burger;
