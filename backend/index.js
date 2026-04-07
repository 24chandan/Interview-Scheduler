//! create an express server and check if it's working

import express from "express";
import cors from "cors"; // cross origin resource sharing (browser blocks the request which comes from anywhere but localhost:8000)
// 1) we are importing express module which we installed using npm i
import dotenv from "dotenv";
import { connectDB } from "./config/database-config.js";

import userRoutes from "./routes/auth-route.js";
import sessionRoutes from "./routes/session-route.js";
import aiRoutes from "./routes/ai-route.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// 2) call/invoke the function
let app = express(); // object = {listen}

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://interview-scheduler-sigma-nine.vercel.app",
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));// this 
app.use(express.json());

app.use("/api/auth", userRoutes); // http://localhost:9001/api/auth/signup
app.use("/api/sessions", sessionRoutes); // http://localhost:9001/api/sessions/create
app.use("/api/ai", aiRoutes); // http://localhost:9001/api/ai/generate-questions

// 3) assign a port number to our server
app.listen(9001, () => {
  console.log("Server Started.....");
});
// app.listen(PORT_NUMBER, callback)

//! to check if the server is running, in cmd(git bash), goto backend folder and type "npx nodemon index.js"
// open browser -> localhost:PORT_NUMBER and press enter

// https://nodejs.org/en/ (/) =>  this is base url
// https://nodejs.org/en/blog => /blog is one endpoint
// https://nodejs.org/en/download

// https://github.com/Sarvesh-1999/NIGHT-CODING-MARATHON
//npx nodemon index.js