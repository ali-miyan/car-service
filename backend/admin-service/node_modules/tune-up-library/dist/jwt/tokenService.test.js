const { TokenService } = require('./tokenService');

describe('TokenService', () => {
    it('should generate and verify a valid token', () => {
        const userId = 'test_user_id';
        const username = 'thomas shelby';
        const token = TokenService.generateToken({ userId,username });

        expect(token).toBeTruthy();

        const verifiedToken = TokenService.verifyToken(token);
        expect(verifiedToken).toBeTruthy();
        expect(verifiedToken.userId).toBe(userId);
    });

    it('should return null for an invalid token', () => {
        const invalidToken = 'invalid_token_here';

        const verifiedToken = TokenService.verifyToken(invalidToken);
        expect(verifiedToken).toBeNull();
    });
});
