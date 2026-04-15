import type { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.ts';


export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Email and password are required', 400));
    }

    if (password.length < 6) {
        return next(new AppError('Password must be at least 6 characters long', 400));
    }  

    next();
}

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new AppError('Email and password are required', 400));
    }

    next();
}