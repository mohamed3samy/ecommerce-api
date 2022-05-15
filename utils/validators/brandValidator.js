const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
	check("id").isMongoId().withMessage("Invalid Brand id format"),
	validatorMiddleware,
];

exports.createBrandValidator = [
	check("name")
		.notEmpty()
		.withMessage("Brand required")
		.isLength({ min: 3 })
		.withMessage("Brand name must have at least 3 characters")
		.isLength({ max: 32 })
		.withMessage("Brand name must have at most 32 characters"),
	validatorMiddleware,
];

exports.updateBrandValidator = [
	check("id").isMongoId().withMessage("Invalid Brand id format"),
	validatorMiddleware,
];

exports.deleteBrandValidator = [
	check("id").isMongoId().withMessage("Invalid Brand id format"),
	validatorMiddleware,
];