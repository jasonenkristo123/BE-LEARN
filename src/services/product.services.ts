import { dbPool } from "../config/db.ts";
import type { ResultSetHeader } from "mysql2";
import { AppError } from "../middlewares/errorHandler.ts";



export const getAllProducts = async (search?: string, minPrice?: string, maxPrice?: string, sort?: string, order?: string) => {
    let query = 'SELECT * FROM products';
    const values = [];
    const conditions = [];

    if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
        throw new AppError('minPrice cannot be greater than maxPrice', 400);
    }

    if (search) {
        conditions.push('name LIKE ?')
        values.push(`%${search}%`);
    }

    if (minPrice) {
        conditions.push('price >= ?');
        values.push(minPrice);
    }

    if (maxPrice) {
        conditions.push('price <= ?');
        values.push(maxPrice);
    }
    
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    if (sort) {
        const sortFields = ['name', 'price'];
        if (sortFields.includes(sort)) {
            query += ` ORDER BY ${sort} ${order === 'desc' ? 'DESC' : 'ASC'}`;
        }
    }


    const [rows] = await dbPool.execute(query, values);
    return rows;
}

export const createProduct = async (name: string, price: number) => {
    const [result] = await dbPool.execute('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);

    if ((result as ResultSetHeader).affectedRows === 0) {
        throw new AppError('Failed to create product', 500);
    }

    return {
        id: (result as ResultSetHeader).insertId,
        name,
        price
    }
}

export const deleteProductService = async (id: number) => {
    const [result] = await dbPool.execute('DELETE FROM products WHERE id = ?', [id]);

    if ((result as ResultSetHeader).affectedRows === 0) {
        throw new AppError('Product not found', 404);
    }

    return (result as ResultSetHeader).affectedRows > 0;
}

export const updateProductService = async (id: number, name?: string, price?: number) => {
    const fields = [];
    const values = [];

    if (name) {
        fields.push('name = ?');
        values.push(name);
    }

    if (price) {
        fields.push('price = ?');
        values.push(price);
    }

    if (fields.length === 0) {
        return null
    }

    values.push(id);

    const [result] = await dbPool.execute(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);

    if ((result as ResultSetHeader).affectedRows === 0) {
        throw new AppError('Product not found', 404);
    }

    return {
        id,
        name,
        price
    }
}
