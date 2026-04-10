import {Router} from "express";
import {createEmployee, deleteEmployees, getAllEmployees, updateEmployees} from "../controllers/employee.controller.ts";


const employeeRoutes = Router();

employeeRoutes.get('/employees', getAllEmployees);
employeeRoutes.post('/employees', createEmployee);
employeeRoutes.put('/employees:id', updateEmployees);
employeeRoutes.delete('/employees:id', deleteEmployees);

export default employeeRoutes;