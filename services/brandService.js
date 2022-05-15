const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const Brand = require("../models/brandModel");

// @desc	Get list of Brands
// @route	GET /api/brands
// @access	Public
exports.getBrands = asyncHandler(async (req, res) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 5;
	const skip = (page - 1) * limit;

	const brands = await Brand.find({}).skip(skip).limit(limit);

	res.status(200).json({
		results: brands.length,
		page,
		data: brands,
	});
});

// @desc	Create Brand
// @route	POST /api/brands
// @access	Private
exports.createBrand = asyncHandler(async (req, res) => {
	const {name} = req.body;
	const brand = await Brand.create({
		name,
		slug: slugify(name),
	});

	res.status(201).json({ data: brand });
});

// @desc	Get specific brand by id
// @route	GET /api/brands/:id
// @access	Public
exports.getBrand = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const brand = await Brand.findById(id);

	if (!brand) {
		return next(new ApiError(`No brand for this id ${id}`, 404));
	}

	res.status(200).json({ data: brand });
});

// @desc	Update specific brand by id
// @route	PUT /api/brands/:id
// @access	Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;

	const brand = await Brand.findOneAndUpdate(
		{ _id: id },
		{ name, slug: slugify(name) },
		{ new: true }
	);

	if (!brand) {
		return next(new ApiError(`No brand for this id ${id}`, 404));
	}

	res.status(200).json({ data: brand });
});

// @desc	Delete specific brand by id
// @route	DELETE /api/brands/:id
// @access	Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const brand = await Brand.findByIdAndDelete(id);

	if (!brand) {
		return next(new ApiError(`No brand for this id ${id}`, 404));
	}

	res.status(204).send();
});
