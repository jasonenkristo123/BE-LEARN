import jwt from 'jsonwebtoken';

const ACCESS_TOKEN = 'ACCESS_TOKEN';
const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const signAccessToken = (payload: any) => {
    return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: '15m' });
}

export const signRefreshToken = (payload: any) => {
    return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: '7d' });
}

export const verifyAccessToken = (token: string) => {
    return jwt.verify(token, ACCESS_TOKEN);
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, REFRESH_TOKEN);
}
