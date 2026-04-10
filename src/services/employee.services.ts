import {dbPool} from "../config/db.ts";
import type {ResultSetHeader} from "mysql2";


export const getAllEmployee = async (search?: string, join_year?: string, email?: string) => {
    let query = 'SELECT * FROM employee';
    let conditions = [];
    let values = [];

    if (search) {
        conditions.push("name LIKE ?");
        values.push(`%${search}%`);
    }

    if (join_year) {
        conditions.push('join_year= ?');
        values.push(join_year);
    }

    if (email) {
        conditions.push('email= ?');
        values.push(email);
    }

    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await dbPool.execute(query, values);
    return rows;
}

export const postEmployee = async (name: string, email: string, join_year: number) => {
    const [result] = await dbPool.execute('INSERT INTO employee (name, email, join_year) VALUES (?, ?, ?)', [name, email, join_year]);

    return (result as ResultSetHeader).affectedRows > 0;
}

export const putEmployee = async (id: number, name: string, email: string, join_year: number) => {
    let fields = [];
    let values = [];

    if (name) {
        fields.push('name = ?');
        values.push(name)
    }

    if (email) {
        fields.push('email = ?');
        values.push(email);
    }

    if (join_year) {
        fields.push('join_year = ?');
        values.push(join_year);
    }

    values.push(id);

    if (fields.length === 0) {
        return null;
    }

    const [result] = await dbPool.execute(`UPDATE employee SET ${fields.join(', ')} WHERE ID = ?`, values)
    if ((result as ResultSetHeader).affectedRows === 0) {
        return null;
    }

    return result;
}

export const deleteEmployee = async (id: number) => {
    const [result] = await dbPool.execute('DELETE FROM employee WHERE ID = ?', id);

    return (result as ResultSetHeader).affectedRows > 0;
}