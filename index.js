const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const productsRoutes = require("./src/routes/products");

app.use(bodyParser.json())

// Mengatasi Error CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.use('/v1/customer', productsRoutes)

app.listen(4000);