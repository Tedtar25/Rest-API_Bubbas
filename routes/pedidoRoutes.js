const express = require('express');
const pedidoService = require('../services/pedidoService')

const router = express.Router();

//Obtener todos los pedidos
router.get('api/pedido/', (req, res) =>{
    
});

//Obtener los pedidos por ID
router.get('api/pedido/:id',(req, res)=>{

});

//Agregar un pedido
router.post('api/pedido',(req, res)=>{

});

//Eliminar o cancelar un pedido pero por el ID
router.delete('api/pedido/:id',(req, res)=>{

});

module.exports = router;