import express from "express";
import { register, login, getCurrentUser, updateProfile, changePassword} from "../controllers/auth.controller.js";
import { registerValidation, loginValidation, updateProfileValidation, changePasswordValidation } from "../validators/auth.validator.js";
import validate from "../middlewares/validate.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

console.log("✅ auth.routes.js loaded");
const router = express.Router();

//router.post("/register", register);
router.post("/register",registerValidation,validate, register);
router.post("/login",loginValidation,validate,login);
router.get("/me",authMiddleware,getCurrentUser);

router.put("/profile",authMiddleware,updateProfileValidation,validate,updateProfile);
router.put("/change-password",authMiddleware,changePasswordValidation,validate,changePassword);

export default router;