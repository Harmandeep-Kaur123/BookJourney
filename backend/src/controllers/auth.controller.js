import { registerUser, loginUser, updateProfile as updateProfileService,changePassword as changePasswordService, } from "../services/auth.service.js";
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

export const updateProfile = async (req, res) => {
    const user = await updateProfileService(
        req.user.id,
        req.body
    );

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: user,
    });
};

export const changePassword = async (
    req,
    res
) => {
    const result = await changePasswordService(
        req.user.id,
        req.body
    );

    res.status(200).json({
        success: true,
        message: result.message,
    });
};