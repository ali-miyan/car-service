"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class TokenService {
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessKey, { expiresIn: '1h' });
    }
    static generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.refreshKey, { expiresIn: '7d' });
    }
    static verifyAccessToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.accessKey);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
    static verifyRefreshToken(token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, this.refreshKey);
            return decoded;
        }
        catch (error) {
            return null;
        }
    }
}
exports.TokenService = TokenService;
TokenService.accessKey = process.env.JWT_SECRET || 'thisisaaccesskeydontshare';
TokenService.refreshKey = process.env.JWT_REFRESH || 'thisisarefreshKeydontshare';
