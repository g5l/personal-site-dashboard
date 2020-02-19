'use strict';
const express = require('express');
const bodyParser = require("body-parser");
const db = require("./models");
const apiProduct = require("./product");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

apiProduct(app, db);

app.listen(port);

console.log('API server started on: ' + port);