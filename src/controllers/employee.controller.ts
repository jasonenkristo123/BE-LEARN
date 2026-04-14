import type {Request, Response} from "express";
import { deleteEmployeeServices, getAllEmployeeServices, postEmployeeServices, putEmployeeServices } from "../services/employee.services.ts";
import { AppError } from "../middlewares/errorHandler.ts";


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
        throw new AppError("No employees found", 404);
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
        throw new AppError("Missing required fields", 400);
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
        throw new AppError("Employee not found", 404);
    }

    res.status(201).json({
        message: "employee successfully updated"
    })
}

export const deleteEmployees = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const result = await deleteEmployeeServices(id);

    if (!result) {
        throw new AppError("Employee not found", 404);
    }

    return res.status(204).send();
}