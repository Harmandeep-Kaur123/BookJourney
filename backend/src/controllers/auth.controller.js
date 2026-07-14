import { registerUser, loginUser } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export const register = asyncHandler(async (req, res) => {

    const user = await registerUser(req.body);
    res.status(HTTP_STATUS.CREATED).json({  //no failure
        success: true,
        data: user
    });

});

export const login = asyncHandler(async (req, res) => {
    const result = await loginUser(req.body);
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Login successful",
        data: result
    });

});

export const getCurrentUser = asyncHandler(async (req, res) => {
    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "User fetched successfully",
        data: req.user,  //from auth middleware
    });
});

//TRY CATCH EVERYWHERE
// export const register = async (req, res, next) => {  
//     try {
//     const user = await registerUser(req.body);
//     res.status(201).json({
//         success: true,
//         message: "User registered successfully",
//         data: user
//     });
//     } catch (error) {
//         next(error);
//     // res.status(400).json({
//     //     success: false,
//     //     message: error.message
//     // });

// }
// };