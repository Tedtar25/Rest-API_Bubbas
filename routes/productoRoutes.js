const express = require('express')
const productoService = require('../services/productoService');
const { route } = require('./pedidoRoutes');

const router = express.Router();

//Obtener todos los productos
router.get('api/productos', (req, res)=>{

});

//Obtener un producto por su ID
router.get('api/productos/:id',(req, res)=>{

});

//Agregar un nuevo producto
router.post('api/productos',(req, res)=>{

});

//Modificar si un producto esta disponible
router.put('api/productos/:id', (req, res)=>{

});

//Eliminar un producto
router.delete('api/productos/:id',(req, res)=>{

});

module.exports = router;