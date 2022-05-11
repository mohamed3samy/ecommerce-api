const mongoose = require("mongoose");

// Create Schema
const categorySchema = new mongoose.Schema(
	{
	  name: {
		type: String,
		required: [true, 'Category required'],
		unique: [true, 'Category must be unique'],
		minlength: [3, 'category name must have at least 3 characters'],
		maxlength: [32, 'category name must have at least 32 characters'],
	  },
	  slug: {
		type: String,
		lowercase: true,
	  },
	  image: String,
	},
	{ timestamps: true }
  );

// Create Model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
