const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategoryModel");

// Nested route
// @route   GET /api/categories/categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
	let filterObj = {};

	if (req.params.categoryId)
		filterObj = { category: req.params.categoryId };

	req.filterObj = filterObj;

	next();
};

// @desc	Get list of Subcategories
// @route	GET /api/subcategories
// @access	Public
exports.getSubCategories = asyncHandler(async (req, res) => {
	const page = req.query.page * 1 || 1;
	const limit = req.query.limit * 1 || 5;
	const skip = (page - 1) * limit;

	const subCategories = await SubCategory.find(req.filterObj)
		.skip(skip)
		.limit(limit);

	console.log(req.params);

	res.status(200).json({
		results: subCategories.length,
		page,
		data: subCategories,
	});
});

exports.setCategoryIdToBody = (req, res, next) => {
	// Nested route
	if (!req.body.category) req.body.category = req.params.categoryId;

	next();
};

// @desc    Create subCategory
// @route   POST /api/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
	const { name, category } = req.body;

	const subCategory = await SubCategory.create({
		name,
		slug: slugify(name),
		category,
	});

	res.status(201).json({ data: subCategory });
});

// @desc	Get specific Subcategory by id
// @route	GET /api/subcategories/:id
// @access	Public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const subCategory = await SubCategory.findById(id);

	if (!subCategory) {
		return next(new ApiError(`No Subcategory for this id ${id}`, 404));
	}

	res.status(200).json({ data: subCategory });
});

// @desc	Update specific subCategory by id
// @route	PUT /api/subcategories/:id
// @access	Private
exports.updateSubCategory = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const { name, category } = req.body;

	const subCategory = await SubCategory.findOneAndUpdate(
		{ _id: id },
		{ name, slug: slugify(name), category },
		// return subCategory after update
		{ new: true }
	);

	if (!subCategory) {
		return next(new ApiError(`No Subcategory for this id ${id}`, 404));
	}

	res.status(200).json({ data: subCategory });
});

// @desc	Delete specific subCategory by id
// @route	DELETE /api/subcategories/:id
// @access	Private
exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
	const { id } = req.params;
	const subCategory = await SubCategory.findByIdAndDelete(id);

	if (!subCategory) {
		return next(new ApiError(`No Subcategory for this id ${id}`, 404));
	}

	res.status(204).send();
});
