import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.routes.js";

import errorHandler from "./middlewares/error.middleware.js";

const app = express();
/*
    Middleware
*/
// Allow requests from frontend
app.use(cors());

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

//Error Handler -- middleware runs in order written
app.use(errorHandler);

//export app

export default app;