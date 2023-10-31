const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModels');  
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//routes 
app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.get('/blog', (req, res) => {
    res.send('Estas en el blog');
});


/**
 * Obtener la lista de articulos
 * @route GET /blog/articulo
 */
app.get('/blog/articulo', (req, res) => {
    res.send('Estas en el articulo');
});


/**
 * Obtener todos los productos
 * @route GET /products
 * @group Productos - Operaciones sobre productos
 * @returns {object} 200 - Un array de productos
 * @returns {Error}  500 - Unexpected error
*/
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json( products );
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * Obtener un producto por su id
 * @route GET /products/:id 
 */
app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json( product );
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * Crear un producto
 * @route POST /products
 */
app.post('/products', async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json( product );
    } catch (err) {
        console.log(err.nessage)
        res.status(500).json({ message: err.message });
    }
});

/**
 * Editar un producto mediante el id con un update
 */
app.put('/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // Verificar si el producto existe sino lanzar un error
        if(!product) res.status(404).json({ message: 'Producto no encontrado' + id});

        //Obtener el producto actualizado
        const updatedProduct = await Product.findById(id);
        res.status(200).json( updatedProduct );
    } catch (err) {
        console.log(err.nessage)
        res.status(404).json({ message: err.message });
    }
});

/**
 * Eliminar un producto mediante el id
 * @route DELETE /products/:id
 */

app.delete('/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        // Verificar si el producto existe sino lanzar un error
        if(!product) res.status(404).json({ message: 'Producto no encontrado' + id});

        res.status(200).json({ message: `Producto ${product.name} eliminado` });
    } catch (err) {
        console.log(err.nessage)
        res.status(404).json({ message: err.message });
    }
});

mongoose.
connect('mongodb+srv://cristian96:nVshJBYfhvc0Xe6F@devapi.db57seo.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('Conexion a la base de datos establecida');
    app.listen(3000, () => {
        console.log('Servidor iniciado en el puerto 3000');
    });
})
.catch((err) => {
    console.log(err);
});