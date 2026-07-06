import { registerUser } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";


export const register = asyncHandler(async (req, res) => {

    const user = await registerUser(req.body);
    res.status(201).json({  //no failure
        success: true,
        data: user
    });

});
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