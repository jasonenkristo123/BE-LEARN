import { Router } from "express";
import { deleteProduct, getProducts, postProduct, updateProduct } from "../controllers/product.controller.ts";
import { validateProductMiddleware } from "../middlewares/validateProduct.ts";
import { authMiddleware } from "../middlewares/auth.middlewares.ts";

const productRouter = Router();


// productRouter.get('/products', getProducts);
productRouter.post('/products',authMiddleware, validateProductMiddleware, postProduct);
productRouter.delete('/products/:id',authMiddleware, deleteProduct);
productRouter.patch('/products/:id',authMiddleware, updateProduct);
productRouter.get('/products',authMiddleware, getProducts);

export default productRouter;