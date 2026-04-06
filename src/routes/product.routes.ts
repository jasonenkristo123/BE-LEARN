import { Router } from "express";
import { deleteProduct, getProducts, postProduct, updateProduct } from "../controllers/product.controller.ts";

const productRouter = Router();


// productRouter.get('/products', getProducts);
productRouter.post('/products', postProduct);
productRouter.delete('/products/:id', deleteProduct);
productRouter.patch('/products/:id', updateProduct);
productRouter.get('/products', getProducts);

export default productRouter;