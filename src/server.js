//Dependencias
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//Start our app
const app = express();

app.listen(3000);
console.log("Server on port: ", 3000);
