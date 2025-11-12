import express from 'express';
import pedidoService from '../services/pedidoService.js';

const router = express.Router();

// Obtener todos los pedidos
router.get('/', async (req, res, next) => {
  try {
    const pedidos = await pedidoService.getAll();
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
});

// Obtener un pedido por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const pedido = await pedidoService.getById(id);

    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: 'No hay pedido con ese ID' });
    }
  } catch (error) {
    next(error);
  }
});

// Crear un nuevo pedido
router.post('/', async (req, res, next) => {
  try {
    const { id_usuario, total, estado } = req.body;

    // Validación básica
    if (!id_usuario || !total) {
      return res.status(400).json({
        message: 'Faltan datos requeridos: id_usuario y total son obligatorios',
      });
    }

    // Crear pedido usando el service
    const nuevoPedido = await pedidoService.create({
      id_usuario,
      total,
      estado: estado || 'pendiente', // por defecto
    });

    res.status(201).json({
      message: 'Pedido creado correctamente',
      data: nuevoPedido,
    });
  } catch (error) {
    next(error);
  }
});

// Eliminar o cancelar un pedido por ID
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletePedido = await pedidoService.delete(id);

    if (deletePedido) {
      res.status(200).json({
        message: 'Pedido cancelado correctamente',
        data: deletePedido,
      });
    } else {
      res.status(404).json({ message: 'No se ha encontrado ese pedido' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
