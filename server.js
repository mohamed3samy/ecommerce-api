const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App listening on port ${port}!`));
