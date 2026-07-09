import bcrypt from "bcrypt";  //Hash password
import User from "../models/User.js";  //  user
import jwt from "jsonwebtoken";
import generateToken from "../utils/generateToken.js";

/* Register user */
export const registerUser = async (userData) => {
    //throw new Error("Testing async Handler");
    const { name, email, password } = userData;
    // Check if user already exists
    const existingUser = await User.findOne({ email });  //mongodb
    if (existingUser) {
        throw new Error("User already exists"); 
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
        throw new Error("Invalid email or password");
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