import type { Request, Response } from 'express';

const products = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
    { id: 3, name: 'Product 3', price: 30 },
];


export const getProducts = (req: Request, res: Response) => {
    res.json({
        data: products
    });
}

export const postProduct = (req: Request, res: Response) => {
    const { name, price } = req.body;


    if (!name || !price) {
        return res.status(400).json({
            message: "Name and price are required"
        })
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price
    }

    products.push(newProduct);

    res.status(201).json({
        message: "Product created successfully",
        data: newProduct
    })
}

export const deleteProduct = (req: Request, res: Response) => {
    const  id  = Number(req.params.id);

    const findIndex = products.findIndex(product => product.id === id);
    
    if (findIndex === -1) {
        return res.status(404).json({
            message: "Product not found"
        })
    }

    products.splice(findIndex, 1);

    res.json({
        message: "Product deleted successfully"
    })
}