const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");

// .env
dotenv.config({ path: "config.env" });

// Connect with db
dbConnection();

// Express app
const app = express();

// Middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
	console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
	next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
	console.log(`App listening on port ${port}!`)
);

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
	console.log(`unhandledRejection Errors: ${err.name} | ${err.message}`);
	server.close(() => {
		console.error("shut down...");
		process.exit(1);
	});
});
