const router = require("express").Router();

const {
	getCategoryValidator,
	createCategoryValidator,
	updateCategoryValidator,
	deleteCategoryValidator,
} = require("../utils/validators/categoryValidator");

const {
	getCategories,
	createCategory,
	getCategory,
	updateCategory,
	deleteCategory,
} = require("../services/categoryService");

router.route("/").get(getCategories).post(createCategoryValidator, createCategory);

router
	.route("/:id")
	.get(getCategoryValidator ,getCategory)
	.put(updateCategoryValidator ,updateCategory)
	.delete(deleteCategoryValidator ,deleteCategory);

module.exports = router;
