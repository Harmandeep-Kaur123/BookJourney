import bcrypt from "bcrypt";  //Hash password
import User from "../models/User.js";  //  user
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import AppError from "../utils/appError.js";

/* Register user */
export const registerUser = async (userData) => {
    //throw new Error("Testing async Handler");
    const { name, email, password } = userData;
    // Check if user already exists
    const existingUser = await User.findOne({ email });  //mongodb
    if (existingUser) {
        throw new AppError("User already exists",HTTP_STATUS.CONFLICT);
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });
    // Return only safe data
    return {
        id: user._id,
        name: user.name,
        email: user.email,
    };
};

/* Login user */
export const loginUser = async (userData) => {
    const { email, password } = userData;
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare passwords
    const isPasswordMatched = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordMatched) {
        throw new AppError("Invalid email or password",HTTP_STATUS.UNAUTHORIZED);
    }

    // Generate JWT
    const token = generateToken(user._id);  //generate token using helper 

    // Return response
    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    };
};

export const updateProfile = async (userId, userData) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(
            "User not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    if (userData.name !== undefined) {
        user.name = userData.name;
    }

    if (userData.readingGoal !== undefined) {
        user.readingGoal = userData.readingGoal;
    }

    await user.save();

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        readingGoal: user.readingGoal,
    };
};

export const changePassword = async (
    userId,
    passwordData
) => {
    const { currentPassword, newPassword } =
        passwordData;

    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(
            "User not found",
            HTTP_STATUS.NOT_FOUND
        );
    }

    const isPasswordMatched =
        await bcrypt.compare(
            currentPassword,
            user.password
        );

    if (!isPasswordMatched) {
        throw new AppError(
            "Current password is incorrect",
            HTTP_STATUS.BAD_REQUEST
        );
    }

    user.password = await bcrypt.hash(
        newPassword,
        10
    );

    await user.save();

    return {
        message: "Password updated successfully",
    };
};