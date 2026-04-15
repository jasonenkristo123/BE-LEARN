import type { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.ts';
import { verifyAccessToken } from '../utils/jwt.ts';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(new AppError('Authorization header is missing', 401));
    }

    const token = authHeader.split(' ')[1];

    next();

    try {
        const decoded = verifyAccessToken(token || '');
        (req as any) = decoded;
    } catch (error) {
        return next(new AppError('Invalid token', 401));
    }


}