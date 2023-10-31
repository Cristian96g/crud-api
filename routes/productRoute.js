const express = require('express');
const Product = require('../models/productModels');  
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();


/**
 * Obtener la lista de productos mediante un get 
 */
router.get('/', getProducts);

/**
 * Obtener un producto por su id mediante un get
 */
router.get('/:id', getProductById);

/**
 * Crear un producto mediante un post
 */
router.post('/', createProduct);

/**
 * Editar un producto mediante un put
 */
router.put('/:id', updateProduct);

/**
 * Eliminar un producto mediante un delete
 */
router.delete('/:id', deleteProduct);


module.exports = router;