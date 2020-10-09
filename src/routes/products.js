const express = require('express');
const router = express.Router();
const productsController = require("../controllers/products");

// CREATE
router.post("/product", productsController.createProduct)

// READ
router.get("/products", productsController.getAllProducts)

// // UPDATE
// router.put("/products", productsController.createProduct)

// // DELETE
// router.delete("/products", productsController.createProduct)

module.exports = router;