import express from "express";
import cors from "cors";

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
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "BookJourney API is running 🚀"
    });
});

//export app

export default app;