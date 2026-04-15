import { Router } from "express";
import { createEmployee, deleteEmployees, getAllEmployees, updateEmployees } from "../controllers/employee.controller.ts";
import { authMiddleware } from "../middlewares/auth.middlewares.ts";


const employeeRoutes = Router();

employeeRoutes.get('/employees', authMiddleware, getAllEmployees);
employeeRoutes.post('/employees', authMiddleware, createEmployee);
employeeRoutes.put('/employees/:id', authMiddleware, updateEmployees);
employeeRoutes.delete('/employees/:id', authMiddleware, deleteEmployees);

export default employeeRoutes;