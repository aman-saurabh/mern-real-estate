import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const whitelist = ['https://my-app.com', 'https://admin.my-app.com'];

app.use((req, res, next) => {
  const origin = req.header('Origin');
  const options = {};

  // Allow non-browser clients like Curl, Postman, mobile app etc. (only browsers set 'Origin' header)
  // Allowing no-Origin is fine when you also enforce proper auth (API keys, JWTs, session cookies) because CORS is a browser protection, not an auth mechanism.
  if (!origin) {
    options.origin = true;
  } else if (whitelist.includes(origin)) {
    // Allow listed origins
    options.origin = true;
    // Enable credentials only for admin origin
    if (origin === 'https://admin.my-app.com') {
      options.credentials = true;
    }
  } else {
    // Disallow other origins
    options.origin = false;
  }

  cors(options)(req, res, next);
});

const server = app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err) => {
    if (err && err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. You can use command 'npx kill-port ${PORT}' to kill the running process on port : ${PORT}`);
    } else {
      console.error("Server failed to start:", err);
    }
    process.exit(1);
  });
