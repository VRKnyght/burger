// Requirements
// ============================================================================================================
const express = require("express");
const burger = require("../models/burger.js")
// ============================================================================================================
// Set up the Express Router
// ============================================================================================================
const router = express.Router();

// ============================================================================================================
// Create the routes
// ============================================================================================================
router.get("/", (req, res) => {
	burger.all((data) => {
		const hbsObject = {
			burgers: data
		};
		console.log("hbsObject" + hbsObject);
		res.render("index", hbsObject);
	});
});

router.post("/api/burgers", (req, res) => {
	burger.create(["burger_name", "cooked", "devoured"], [req.body.name, req.body.cooked, req.body.devoured], (result) => {
		res.json({ id: result.insertId });
	});
});
	
router.put("/api/burgers/:id", (req, res) => {
	const condition = "id = " + req.params.id;

	console.log("[burgers_controller.js] condition: " + condition);

	burger.update(
		{
			cooked: req.body.cooked
		},
		condition,
		(result) => {
			if (result.changedRows === 0) {
				return res.status(404).end();
			}
			res.status(200).end();

		}
	);
});

router.delete("/api/burgers/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// ============================================================================================================
// Export for Server to use
// ============================================================================================================
module.exports = router;
// ============================================================================================================