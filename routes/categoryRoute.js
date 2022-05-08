const router = require("express").Router();

const {
	getCategories,
	createCategory,
	getCategory,
	updateCategory,
	deleteCategory,
} = require("../services/categoryService");

router.route("/").get(getCategories).post(createCategory);
router
	.route("/:id")
	.get(getCategory)
	.put(updateCategory)
	.delete(deleteCategory);

module.exports = router;
