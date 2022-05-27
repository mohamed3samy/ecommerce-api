const Product = require("../models/productModel");
const factory = require("./handlersFactory");

// @desc	Get list of products
// @route	GET /api/products
// @access	Public
exports.getProducts = factory.getAll(Product, "Products");

// @desc	Create product
// @route	POST /api/products
// @access	Private
exports.createProduct = factory.createOne(Product);

// @desc	Get specific product by id
// @route	GET /api/products/:id
// @access	Public
exports.getProduct = factory.getOne(Product);

// @desc	Update specific product by id
// @route	PUT /api/products/:id
// @access	Private
exports.updateProduct = factory.updateOne(Product);

// @desc	Delete specific product by id
// @route	DELETE /api/products/:id
// @access	Private
exports.deleteProduct = factory.deleteOne(Product);
