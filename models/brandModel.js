const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Brand required"],
			unique: [true, "Brand must be unique"],
			minlength: [3, "Brand name must have at least 3 characters"],
			maxlength: [32, "Brand name must have at least 32 characters"],
		},

		slug: {
			type: String,
			lowercase: true,
		},
		image: String,
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
