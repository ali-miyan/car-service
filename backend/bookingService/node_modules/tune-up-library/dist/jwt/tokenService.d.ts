interface TokenPayload {
    user: string;
    role: string;
}
export declare class TokenService {
    private static readonly accessKey;
    private static readonly refreshKey;
    static generateToken(payload: TokenPayload): string;
    static generateRefreshToken(payload: TokenPayload): string;
    static verifyAccessToken(token: string): TokenPayload | null;
    static verifyRefreshToken(token: string): TokenPayload | null;
}
export {};
