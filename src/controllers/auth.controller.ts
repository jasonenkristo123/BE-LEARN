import type { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser } from '../services/auth.services.ts';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.ts';
import { AppError } from '../middlewares/errorHandler.ts';


export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const user = await registerUser(email, password);

        res.status(201).json({
            message: 'User registered successfully',
            data: user
        });
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
            
        const user = await loginUser(email, password);

        const accessToken = signAccessToken({ id: user?.id });
        const refreshToken = signRefreshToken({ id: user?.id });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            path: '/auth/refresh'
        });

        res.json({
            message: 'Login successful',
            accessToken
        })
    } catch (error) {
        next(error);
    }
}

export const refresh = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            throw new AppError('Unauthorized', 401);
        }

        const decoded = verifyRefreshToken(token);

        if (typeof decoded === 'string') {
            throw new AppError('Invalid token', 401);
        }

        const accessToken = signAccessToken({ id: decoded.id });

        res.json({
            message: 'Token refreshed successfully',
            accessToken
        });
    } catch (error) {
        next(error);
    }
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie('refreshToken', {
            path: '/auth/refresh',
        });

        res.json({
            message: 'Logout successful'
        });
    } catch (error) {
        next(error);
    }
}

