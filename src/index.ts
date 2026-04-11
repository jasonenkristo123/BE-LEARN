import express from 'express';
import productRouter from './routes/product.routes.ts';
import employeeRoutes from "./routes/employee.routes.ts";
import { loggerMiddleware } from './middlewares/logger.ts';


const app = express();
const PORT = 3000;

app.use(express.json()); // middlware untuk mengolah yang berhubungan dengan json
app.use(loggerMiddleware); // middleware untuk logging setiap request yang masuk
app.use(productRouter);
app.use(employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;
