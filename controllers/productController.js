const Product = require('../models/productModels');
const asyncHandler = require('express-async-handler');

// Obtener todos los productos
const getProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json( products );
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// Buscar un producto por su id
const getProductById = asyncHandler(
    async (req, res) => {
        try {
            const {id} = req.params;
            const product = await Product.findById(id);
            res.status(200).json( product );
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    }
)


// Crear un producto
const createProduct =  asyncHandler(async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json( product );
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})


// Editar un producto mediante el id con un update
const updateProduct =  asyncHandler(async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // Verificar si el producto existe sino lanzar un error
        if(!product){
            res.status(404);
            throw new Error({message: 'Producto no encontrado' + id});
        } 

        //Obtener el producto actualizado
        const updatedProduct = await Product.findById(id);
        res.status(200).json( updatedProduct );
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})


// Eliminar un producto mediante el id
const deleteProduct =  asyncHandler(async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        // Verificar si el producto existe sino lanzar un error
        if(!product){
            res.status(404);
            throw new Error({message: 'Producto no encontrado' + id});
        } 
        res.status(200).json({ message: `Producto ${product.name} eliminado` });
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}