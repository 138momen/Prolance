require("dotenv").config();

const connectDB = require("./src/config/db");
const app = require("./src/app");

const requiredEnvironment = ["MONGODB_URI", "JWT_SECRET"];
const missingEnvironment = requiredEnvironment.filter(
  (name) => !process.env[name] || process.env[name].includes("your_"),
);

if (missingEnvironment.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvironment.join(", ")}`,
  );
}

// 1. Initiate the database connection
connectDB().catch((error) => {
  console.error("Failed to connect to database:", error.message);
});

// 2. Export the app instead of using app.listen()
module.exports = app;
