import express from 'express';
import productRouter from './routes/product.routes.ts';
import employeeRoutes from "./routes/employee.routes.ts";


const app = express();

app.use(express.json()); // middlware untuk mengolah yang berhubungan dengan json

const PORT = 3000;

app.use(productRouter)
app.use(employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;
