import { HTTP_STATUS } from "../constants/httpStatus.js";

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    if (process.env.NODE_ENV !== "production") {
        console.error(err);
    }

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};

export default errorHandler;

// const errorHandler = (err, req, res, next) => {
//     res.status(500).json({    //ONLY RETURNING 500
//         success: false,
//         message: err.message || "Internal Server Error"
//     });
// };
// export default errorHandler;