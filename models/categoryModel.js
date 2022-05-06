const mongoose = require("mongoose");

// Create Schema
const categorySchema = new mongoose.Schema({ name: String });

// Create Model
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
