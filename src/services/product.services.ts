type Product = {
    id: number;
    name: string;
    price: number;
}

let products: Product[] = [
    { id: 1, name: "Laptop", price: 10 },
    { id: 2, name: "Mouse", price: 20 },
    { id: 3, name: "Headphone", price: 30 },
    { id: 4, name: "Keyboard", price: 40 },
]

export const getAllProducts = (search?: string): Product[] => {
    if (search) {
        return products.filter(products => products.name.toLowerCase().includes((search as string).toLowerCase()));
    }
    return products;
}

export const createProduct = (name: string, price: number): Product => {
    const newProduct: Product = {
        id: products.length + 1,
        name,
        price
    }

    products.push(newProduct);

    return newProduct;
}

export const deleteProductService = (id: number) => {
    const findIndex = products.findIndex(product => product.id === id);

    if (findIndex === -1) {
        return false;
    }

    products.splice(findIndex, 1);

    return true;
}

export const updateProductService = (id: number, name?: string, price?: number) => {
    const product = products.find(product => product.id === id);

    if (!product) {
        return null;
    }

    if (name) product.name = name;
    if (price !== undefined) product.price = price;

    return product;
}
