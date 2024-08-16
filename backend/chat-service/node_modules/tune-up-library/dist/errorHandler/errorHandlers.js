"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = exports.NotFoundError = exports.BadRequestError = void 0;
class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Bad Request Error';
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Not Found Error';
    }
}
exports.NotFoundError = NotFoundError;
class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Unauthorized Error';
    }
}
exports.UnauthorizedError = UnauthorizedError;
