import type { ResultSetHeader } from "mysql2";
import { dbPool } from "../config/db.ts"
import { AppError } from "../middlewares/errorHandler.ts";
import bcrypt from 'bcrypt';

export const registerUser = async (email: string, password: string) => {
    const [existingUser] = await dbPool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (Array.isArray(existingUser) && existingUser.length > 0) {
        throw new AppError('Email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await dbPool.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);

    return {
        id: (result as ResultSetHeader).insertId,
        email
    }
}

type users = {
    id: number;
    email: string;
    password: string;
}

export const loginUser = async (email: string, password: string) => {
    const [users] = await dbPool.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (Array.isArray(users) && users.length === 0) {
        throw new AppError('Invalid email or password', 400);
    }

    const user = (users as users[])[0];

    const isPasswordValid = await bcrypt.compare(password, user?.password || '');

    if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 400);
    }

    return user;
}
