import express from 'express';
import pedidoService from '../services/pedidoService.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const pedidos = await pedidoService.getAll();
    res.json(pedidos);
  } catch (error) {
    next(error);
  }
});

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

router.get('/usuario/:id_usuario', async (req, res, next) => {
  try {
    const { id_usuario } = req.params;

    const pedidos = await pedidoService.getByUser(id_usuario);

    if (pedidos.length > 0) {
      res.status(200).json(pedidos);
    } else {
      res.status(404).json({ message: 'Este usuario no tiene pedidos registrados' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/completo', async (req, res, next) => {
  try {
    const { id_usuario, productos } = req.body;

    if (!id_usuario || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        message:
          'Se requiere id_usuario y una lista de productos con id_producto y cantidad',
      });
    }

    const nuevoPedido = await pedidoService.createWithDetails({
      id_usuario,
      productos,
    });

    res.status(201).json({
      message: 'Pedido creado correctamente',
      data: nuevoPedido,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletePedido = await pedidoService.delete(id);

    if (deletePedido) {
      res.status(200).json({
        message: 'Pedido Cancelado',
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
