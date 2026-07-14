import asyncHandler from "../utils/asyncHandler.js";
import { getDashboard } from "../services/dashboard.service.js";
import {HTTP_STATUS} from "../constants/httpStatus.js";

export const getDashboardController =
    asyncHandler(async (req, res) => {
        const dashboard =
            await getDashboard(req.user.id);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: dashboard,
        });
});
