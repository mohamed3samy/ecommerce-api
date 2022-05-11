const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
	check("id").isMongoId().withMessage("Invalid category id format"),
	validatorMiddleware,
];

exports.createCategoryValidator = [
	check("name")
		.notEmpty()
		.withMessage("Category required")
		.isLength({ min: 3 })
		.withMessage("category name must have at least 3 characters")
		.isLength({ max: 32 })
		.withMessage("category name must have at most 32 characters"),
	validatorMiddleware,
];

exports.updateCategoryValidator = [
	check("id").isMongoId().withMessage("Invalid category id format"),
	validatorMiddleware,
];

exports.deleteCategoryValidator = [
	check("id").isMongoId().withMessage("Invalid category id format"),
	validatorMiddleware,
];
