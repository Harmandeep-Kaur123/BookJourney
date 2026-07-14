import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.routes.js";
import noteRoutes from "./routes/note.routes.js";
import dashboardRoutes from "./routes/dashboard.route.js"

import errorHandler from "./middlewares/error.middleware.js";

const app = express();
/*
    Middleware
*/
// Allow requests from frontend
//app.use(cors());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    //credentials: true,
  })
);
// Parse incoming JSON requests
app.use(express.json());

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

/*
ROUTES
*/

// Health Check Route
// app.get("/", (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "BookJourney API is running 🚀"
//     });
// });
//register route
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard",dashboardRoutes);

//Error Handler -- middleware runs in order written
app.use(errorHandler);

//export app

export default app;