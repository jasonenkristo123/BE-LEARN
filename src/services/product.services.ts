import { dbPool } from "../config/db.ts";
import type { ResultSetHeader } from "mysql2";



export const getAllProducts = async (search?: string, minPrice?: string) => {
    let query = 'SELECT * FROM products';
    const values = [];
    const conditions = [];

    if (search) {
        conditions.push('name LIKE ?')
        values.push(`%${search}%`);
    }

    if (minPrice) {
        conditions.push('price >= ?');
        values.push(minPrice);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await dbPool.execute(query, values);
    return rows;
}

export const createProduct = async (name: string, price: number) => {
    const [result] = await dbPool.execute('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);

    return {
        id: (result as ResultSetHeader).insertId,
        name,
        price
    }
}

export const deleteProductService = async (id: number) => {
    const [result] = await dbPool.execute('DELETE FROM products WHERE id = ?', [id]);

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
        return null;
    }

    return {
        id,
        name,
        price
    }
}
