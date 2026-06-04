import type { TTodoItems } from "../types/todolist.ts";



export const getTodoList = async (params: TTodoItems) => {
    let query = 'SELECT * FROM todolist';
    const values = [];
    const conditions = [];

    
}