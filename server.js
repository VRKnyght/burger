// Requirements
// =================================================================================
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

const routes = require("./controllers/burgers_controller.js");
// =================================================================================
// Set up express and PORT to run on 9001 (over 9000)
// =================================================================================
const PORT = process.env.PORT || 9001;

const app = express();
// =================================================================================
// Use the app
// =================================================================================
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// =================================================================================
// Set Handlebars
// =================================================================================
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
// =================================================================================
// Import routes and give the server access to them.
// =================================================================================
app.use(routes);

app.listen(PORT, ()=> {
	console.log("App now listening at localhost: " + PORT);
});