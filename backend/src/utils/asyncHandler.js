//high order function ; gets fn as argument
const asyncHandler = (fn) => {
    return async (req, res, next) => {  //express expects this as response; else cant be used as middleware
        try {
            await fn(req, res, next);   //executes controller
        } catch (error) {
            next(error);  //if error , sends to error middleware
        }
    };
};

export default asyncHandler;