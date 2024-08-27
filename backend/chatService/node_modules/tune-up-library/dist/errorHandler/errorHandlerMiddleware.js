"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandlers_1 = require("./errorHandlers");
const errorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let errorMessage = "Internal Server Error";
    if (err instanceof errorHandlers_1.BadRequestError) {
        statusCode = 400;
        errorMessage = err.message;
    }
    else if (err instanceof errorHandlers_1.NotFoundError) {
        statusCode = 404;
        errorMessage = "Not Found";
    }
    else if (err instanceof errorHandlers_1.UnauthorizedError) {
        statusCode = 401;
        errorMessage = "Unauthorized";
    }
    res.status(statusCode).json({ error: errorMessage });
};
exports.errorHandler = errorHandler;
