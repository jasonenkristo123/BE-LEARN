import express from 'express';
import productRouter from './routes/product.routes.ts';
import employeeRoutes from "./routes/employee.routes.ts";
import { loggerMiddleware } from './middlewares/logger.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import cookieParser  from 'cookie-parser';
import { authMiddleware } from './middlewares/auth.middlewares.ts';
import routerAuth from './routes/auth.routes.ts';


const app = express();
const PORT = 3000;

app.use(cookieParser());

app.use(express.json()); // middlware untuk mengolah yang berhubungan dengan json
app.use(loggerMiddleware); // middleware untuk logging setiap request yang masuk
app.use(routerAuth); // middleware untuk route authentication
app.use(productRouter);
app.use(employeeRoutes);



app.use(errorHandler); // middleware untuk menangani error yang terjadi di dalam aplikasi

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;
