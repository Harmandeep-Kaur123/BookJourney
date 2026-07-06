import bcrypt from "bcrypt";  //Hash password
import User from "../models/User.js";  // create user

export const registerUser = async (userData) => {
    throw new Error("Testing async Handler");
    //  const { name, email, password } = userData;

    // // Check if user already exists
    // const existingUser = await User.findOne({ email });  //mongodb

    // if (existingUser) {
    //     throw new Error("User already exists");
    // }

    // // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // // Create new user
    // const user = await User.create({
    //     name,
    //     email,
    //     password: hashedPassword,
    // });
    // // Return only safe data
    // return {
    //     id: user._id,
    //     name: user.name,
    //     email: user.email,
    // };
};