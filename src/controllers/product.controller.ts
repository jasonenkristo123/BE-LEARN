import type { Request, Response } from "express";
import { createProduct, deleteProductService, getAllProducts, updateProductService } from "../services/product.services.ts";


export const getProducts = async (req: Request, res: Response) => {
    const {
        search,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10,
        sort,
        order = 'asc'
    } = req.query;

    const result = await getAllProducts(
        search as string,
        minPrice as string, 
        maxPrice as string, 
        sort as string, 
        order as string);
    const data = Array.isArray(result) ? result : '';

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const startIndex = (pageNumber - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    const paginatedData = data.slice(startIndex, endIndex);

    return res.json({
        data: paginatedData,
        meta: {
            total: data.length,
            page: pageNumber,
            limit: limitNumber,
        }
    })
}


export const postProduct = async (req: Request, res: Response) => {
    const { name, price } = req.body;

    const product = await createProduct(name, price);

    return res.status(201).json({
        message: "Product created successfully",
        data: product
    })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const success = await deleteProductService(id);

    if (!success) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    return res.status(204).send();
}

export const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const { name, price } = req.body;

    const updatedProduct = await updateProductService(id, name, price);

    if (!updatedProduct) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    return res.status(201).json({
        updateProduct,
        message: "Product updated successfully"
    })
}