import type { Request, Response } from "express";
import { createProduct, deleteProductService, getAllProducts, updateProductService } from "../services/product.services.ts";


export const getProducts = (req: Request, res: Response) => {
    const { search, page = 1, limit = 10 } = req.query;

    const data = getAllProducts(search as string);

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


export const postProduct = (req: Request, res: Response) => {
    const { name, price } = req.body;

    if (!name || !price) {
        return res.status(400).json({
            message: "Name and price are required"
        })
    }

    const product = createProduct(name, price);

    return res.status(201).json({
        message: "Product created successfully",
        data: product
    })
}

export const deleteProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const success = deleteProductService(id);

    if (!success) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    return res.status(204).send();
}

export const updateProduct = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const { name, price } = req.body;

    const updatedProduct = updateProductService(id, name, price);

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