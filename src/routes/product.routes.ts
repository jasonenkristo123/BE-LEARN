import { Router } from "express";
import { deleteProduct, getProducts, postProduct } from "../controllers/product.controller.ts";

const productRouter = Router();


productRouter.get('/products', getProducts);
productRouter.post('/products', postProduct);
productRouter.delete('/products/:id', deleteProduct);

export default productRouter;