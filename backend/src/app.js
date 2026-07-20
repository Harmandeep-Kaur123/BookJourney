import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.routes.js";
import noteRoutes from "./routes/note.routes.js";
import dashboardRoutes from "./routes/dashboard.route.js"

import errorHandler from "./middlewares/error.middleware.js";

import { env } from "./config/env.js";
import { compare } from "bcrypt";

const app = express();
/*  Middleware */
app.use(
  cors({
    //origin: process.env.FRONTEND_URL,
    origin: env.FRONTEND_URL,
    credentials: true,
  })
);
// Parse incoming JSON requests
app.use(express.json());

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

/*
ROUTES
*/

//register route
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard",dashboardRoutes);

//Error Handler -- middleware runs in order written
app.use(errorHandler);

//export app

export default app;