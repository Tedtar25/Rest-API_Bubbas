import express, { json } from 'express';
import productoService from '../services/productoService.js';

const router = express.Router();

//Obtener todos los productos
router.get('/', async (req, res, next) => {
    try {
        const products = await productoService.getAll();
        res.json(products)
    } catch (error) {
        next(error)
    }
});

//Obtener producto por ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await productoService.getById(id);
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404), json({ message: ' Producto no encontrado' })
        }
    } catch (error) {
        next(error)
    }
});

//Agregar nuevo producto
router.post('/', async (req, res, next) => {
    try {
        const { nombre, descripcion, precio, disponible, categoria } = req.body;
        const newProduct = await productoService.create({ nombre, descripcion, precio, disponible, categoria });
        res.status(201).json({
            message: 'Producto agregado',
            data: newProduct
        })
    } catch (error) {
        next(error)
    }
});

//Modificar los datos de un producto
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { precio, disponible, categoria } = req.body;
        const updateProduct = await productoService.update(id, { precio, disponible, categoria });
        if (updateProduct) {
            res.status(200).json({
                message: 'Producto actualizado',
                data: updateProduct
            });
        } else {
            res.status(404).json({ message: 'Producto no encontrado' })
        }
    } catch (error) {
        next(error)
    }
})

//Eliminar un producto
router.delete('/:id', async (req, res, next)=>{
    try{
        const {id} = req.params;
        const deletedProduct = await productoService.delete(id);
        if(deletedProduct){
            res.status(200).json({
                message: 'Producto eliminado',
                data:deletedProduct
            })
        }else{
            res.status(404).json({message: 'Producto no encontrado'})
        }
    }catch(error){
        next(error)
    }
})

export default router;