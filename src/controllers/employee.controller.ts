import type {Request, Response} from "express";
import { deleteEmployeeServices, getAllEmployeeServices, postEmployeeServices, putEmployeeServices } from "../services/employee.services.ts";


export const getAllEmployees = async (req: Request, res: Response) => {
    const { search, page = 1, limit = 10, email, join_year } = req.query;

    const result = await getAllEmployeeServices(search as string, email as string, join_year as string);
    const data = Array.isArray(result) ? result : '';

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    const paginatedData = data.slice(startIndex, endIndex);

    if (!data) {
        return res.status(404).json({
            message: 'Employee not found'
        })
    }

    return res.json({
        data: paginatedData,
        meta: {
            'page': pageNumber,
            'limit': limitNumber,
            'total': data.length
        }
    })
}

export const createEmployee = async (req: Request, res: Response) => {
    const { name, email, join_year } = req.body;

    if (!name || !email || !join_year) {
        return res.status(404).json({
            message: 'Employee not found'
        })
    }

    const result = await postEmployeeServices(name, email, join_year);

    return res.status(201).json({
        message: "post employee success!",
        data: result
    })
}

export const updateEmployees = async (req: Request, res: Response) => {
    const { name, email, join_year } = req.body;
    const id = Number(req.params.id);

    const result = await putEmployeeServices(id, name, email, join_year);

    if (!result) {
        return res.status(404).json({
            message: "Employees not found"
        })
    }

    res.status(201).json({
        message: "employee successfully updated"
    })
}

export const deleteEmployees = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const result = await deleteEmployeeServices(id);

    if (!result) {
        return res.status(404).json({
            message: "delete employee failed"
        })
    }

    return res.status(204).send();
}