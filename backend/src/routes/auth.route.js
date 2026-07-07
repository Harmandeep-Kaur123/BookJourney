import express from "express";
import { register, login, getCurrentUser } from "../controllers/auth.controller.js";
import { registerValidation, loginValidation } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

console.log("✅ auth.routes.js loaded");
const router = express.Router();

//router.post("/register", register);
router.post("/register",registerValidation,validate, register);
router.post("/login",loginValidation,validate,login);
router.get("/me",authMiddleware,getCurrentUser);

export default router;