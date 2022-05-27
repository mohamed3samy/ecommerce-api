const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");

// @desc	Get list of Brands
// @route	GET /api/brands
// @access	Public
exports.getBrands = factory.getAll(Brand);

// @desc	Create Brand
// @route	POST /api/brands
// @access	Private
exports.createBrand = factory.createOne(Brand);

// @desc	Get specific brand by id
// @route	GET /api/brands/:id
// @access	Public
exports.getBrand = factory.getOne(Brand);

// @desc	Update specific brand by id
// @route	PUT /api/brands/:id
// @access	Private
exports.updateBrand = factory.updateOne(Brand);

// @desc	Delete specific brand by id
// @route	DELETE /api/brands/:id
// @access	Private
exports.deleteBrand = factory.deleteOne(Brand);
