require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
var cors = require('cors');

const app = express();


//Puerto de conexion
const PORT = process.env.PORT || 3000;
//Almacenar la url de conexion a la base de datos
const MONGO_URL = process.env.MONGO_URL;
//
const FRONTEND = process.env.FRONTEND;
var corsOptions = {
    origin: FRONTEND,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };


app.use(cors(corsOptions));
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// Middleware de errores
app.use(errorMiddleware);

// Rutas
app.use('/api/products', productRoute);

// Rutas de usuarios 
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


// Conectar a la base de datos 
mongoose.
connect(MONGO_URL)
.then(() => {
    console.log('Conexion a la base de datos establecida');
    app.listen(PORT, () => {
        console.log(`Servidor iniciado en el puerto ${PORT}`);
    });
})
.catch((err) => {
    console.log(err);
});