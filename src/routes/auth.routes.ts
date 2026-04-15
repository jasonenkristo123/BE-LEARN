import { Router } from "express";
import { validateLogin, validateRegister } from "../middlewares/authValidate.ts";

import { login, logout, refresh, register } from "../controllers/auth.controller.ts";


const routerAuth = Router();

routerAuth.post('/auth/register', validateRegister, register);
routerAuth.post('/auth/login', validateLogin, login);
routerAuth.post('/auth/refresh', refresh);
routerAuth.post('/auth/logout', logout);

export default routerAuth;