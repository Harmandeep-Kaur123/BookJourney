import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors.array().map(error => ({
            field: error.path,
            message: error.msg
        }));
        return res.status(400).json({
            success: false,
            errors: formattedErrors
        });
    }
    next();
};

export default validate;


//ALL THIS INFO WILL NOT BE NEEDED FOR UI - field and msg only
// {
//   "success": false,
//   "errors": [
//     {
//       "type": "field",
//       "value": "123456",
//       "msg": "Password must be at least 8 characters",
//       "path": "password",
//       "location": "body"
//     }
//   ]
//}