import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Determine environment
const ENV = process.env.NODE_ENV || "dev";

// Decide which env file to load
const envFile = ENV === "production" ? ".env" : `.env.${ENV}`;

// Load environment variables
dotenv.config({ path: envFile });

console.log(`Environment: ${ENV}`);
console.log(`Loaded env file: ${envFile}`);

const PORT = process.env.PORT || 5000;

const app = express();

// CORS whitelist
const whitelist = [
  "https://my-app.com",
  "https://admin.my-app.com",
];

app.use((req, res, next) => {
  const origin = req.header("Origin");
  const options = {};

  if (!origin) {
    options.origin = true;
  } else if (whitelist.includes(origin)) {
    options.origin = true;

    if (origin === "https://admin.my-app.com") {
      options.credentials = true;
    }
  } else {
    options.origin = false;
  }

  cors(options)(req, res, next);
});

const server = app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    if (err?.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Run: npx kill-port ${PORT}`
      );
    } else {
      console.error("Server failed to start:", err);
    }
    process.exit(1);
  });