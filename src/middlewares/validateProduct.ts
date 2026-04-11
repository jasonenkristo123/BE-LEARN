import type { NextFunction, Request, Response } from "express";


export const validateProductMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({
            message: "Name and price are required"
        })
    }

    if (typeof name !== 'string' || typeof price !== 'number') {
        return res.status(400).json({
            message: "Invalid data type for name or price"
        })
    }

    next();

}