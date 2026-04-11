import { Router } from "express";
import { deleteProduct, getProducts, postProduct, updateProduct } from "../controllers/product.controller.ts";
import { validateProductMiddleware } from "../middlewares/validateProduct.ts";

const productRouter = Router();


// productRouter.get('/products', getProducts);
productRouter.post('/products', validateProductMiddleware, postProduct);
productRouter.delete('/products/:id', deleteProduct);
productRouter.patch('/products/:id', updateProduct);
productRouter.get('/products', getProducts);

export default productRouter;