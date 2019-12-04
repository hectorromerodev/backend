//Dependencias
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//Port settings
const port = process.env.PORT || 4232;
//Start our app
const app = express();
//App middleware settings
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, function() {
	console.log(`Server on port: ${port}`);
});
