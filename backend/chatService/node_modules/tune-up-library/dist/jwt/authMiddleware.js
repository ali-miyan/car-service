"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const tokenService_1 = require("./tokenService");
function authMiddleware(roles) {
    return (req, res, next) => {
        let token;
        let refreshToken;
        let decodedToken = null;
        const checkAndRefreshToken = (token, refreshToken, tokenName) => {
            let decoded = tokenService_1.TokenService.verifyAccessToken(token);
            if (!decoded && refreshToken) {
                decoded = tokenService_1.TokenService.verifyRefreshToken(refreshToken);
                if (decoded) {
                    const newAccessToken = tokenService_1.TokenService.generateToken({
                        user: decoded.user,
                        role: decoded.role
                    });
                    res.cookie(tokenName, newAccessToken, { maxAge: 60 * 60 * 1000 });
                }
            }
            return decoded;
        };
        if (roles.includes('admin') && req.cookies.adminToken) {
            token = req.cookies.adminToken;
            refreshToken = req.cookies.adminRefreshToken;
            decodedToken = checkAndRefreshToken(token, refreshToken, 'adminToken');
            if (decodedToken && roles.includes(decodedToken.role)) {
                req.user = decodedToken;
                return next();
            }
        }
        if (roles.includes('company') && req.cookies.companyToken) {
            token = req.cookies.companyToken;
            refreshToken = req.cookies.companyRefreshToken;
            decodedToken = checkAndRefreshToken(token, refreshToken, 'companyToken');
            if (decodedToken && roles.includes(decodedToken.role)) {
                req.user = decodedToken;
                return next();
            }
        }
        if (roles.includes('user') && req.cookies.userToken) {
            token = req.cookies.userToken;
            refreshToken = req.cookies.userRefreshToken;
            decodedToken = checkAndRefreshToken(token, refreshToken, 'userToken');
            if (decodedToken && roles.includes(decodedToken.role)) {
                req.user = decodedToken;
                return next();
            }
        }
        return res.status(403).json({ message: 'Unauthorized' });
    };
}
