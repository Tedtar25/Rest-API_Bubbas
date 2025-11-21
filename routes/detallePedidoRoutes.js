import express from 'express';
import detallePedidoService from '../services/detallePedidoService.js';

const router = express.Router();

// Obtener todos los detalles de pedidos
router.get('/', async (req, res, next) => {
  try {
    const detalles = await detallePedidoService.getAll();
    res.json(detalles);
  } catch (error) {
    next(error);
  }
});

// Obtener detalles por ID de pedido
router.get('/pedido/:id_pedido', async (req, res, next) => {
  try {
    const { id_pedido } = req.params;
    const detalles = await detallePedidoService.getByPedido(id_pedido);

    if (detalles.length > 0) {
      res.status(200).json(detalles);
    } else {
      res.status(404).json({ message: 'No hay detalles para ese pedido' });
    }
  } catch (error) {
    next(error);
  }
});

// Crear un nuevo detalle de pedido
router.post('/', async (req, res, next) => {
  try {
    const { id_pedido, id_producto, cantidad } = req.body;

    if (!id_pedido || !id_producto || !cantidad) {
      return res.status(400).json({
        message:
          'Faltan datos requeridos: id_pedido, id_producto y cantidad son obligatorios',
      });
    }

    const nuevoDetalle = await detallePedidoService.create({
      id_pedido,
      id_producto,
      cantidad,
    });

    res.status(201).json({
      message: 'Detalle agregado correctamente',
      data: nuevoDetalle,
    });
  } catch (error) {
    next(error);
  }
});

// Eliminar un detalle por su ID
router.delete('/:id_detalle', async (req, res, next) => {
  try {
    const { id_detalle } = req.params;
    const eliminado = await detallePedidoService.delete(id_detalle);

    if (eliminado) {
      res.status(200).json({
        message: 'Detalle eliminado correctamente',
      });
    } else {
      res.status(404).json({ message: 'No existe un detalle con ese ID' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;

/**cloudflared tunnel --url http://localhost:666 */