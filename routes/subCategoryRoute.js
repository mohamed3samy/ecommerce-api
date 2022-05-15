const express = require("express");

const {
	createSubCategory,
	getSubCategories,
	getSubCategory,
	updateSubCategory,
	deleteSubCategory,
	setCategoryIdToBody,
	createFilterObj,
} = require("../services/subCategoryService");

const {
	createSubcategoryValidator,
	getSubcategoryValidator,
	updateSubcategoryValidator,
	deleteSubcategoryValidator,
} = require("../utils/validators/subCategoryValidator");

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category routers
const router = express.Router({ mergeParams: true });

router
	.route("/")
	.get(createFilterObj, getSubCategories)
	.post(
		setCategoryIdToBody,
		createSubcategoryValidator,
		createSubCategory
	);

router
	.route("/:id")
	.get(getSubcategoryValidator, getSubCategory)
	.put(updateSubcategoryValidator, updateSubCategory)
	.delete(deleteSubcategoryValidator, deleteSubCategory);

module.exports = router;
