import db from '../config/bubba_db.js';

class DetallePedidoService {

  // Obtener todos los detalles
  async getAll() {
    try {
      const [rows] = await db.promise().query('SELECT * FROM Detalle_Pedido');
      return rows;
    } catch (error) {
      console.error('Error al obtener los detalles de pedidos:', error);
      throw error;
    }
  }

  // Obtener detalles por ID de pedido
  async getByPedido(id_pedido) {
    try {
      const [rows] = await db.promise().query(
        `SELECT dp.id_detalle_pedido,
                dp.id_pedido,
                dp.id_producto,
                dp.cantidad,
                p.nombre AS nombre_producto,
                p.precio AS precio_unitario,
                (dp.cantidad * p.precio) AS subtotal
         FROM Detalle_Pedido dp
         JOIN Producto p ON dp.id_producto = p.id_producto
         WHERE dp.id_pedido = ?`,
        [id_pedido]
      );

      return rows;
    } catch (error) {
      console.error('Error al obtener los detalles del pedido:', error);
      throw error;
    }
  }

  // Crear detalle
  async create({ id_pedido, id_producto, cantidad }) {
    try {
      const [result] = await db
        .promise()
        .query(
          'INSERT INTO Detalle_Pedido (id_pedido, id_producto, cantidad) VALUES (?, ?, ?)',
          [id_pedido, id_producto, cantidad]
        );

      return {
        id_detalle_pedido: result.insertId,
        id_pedido,
        id_producto,
        cantidad,
      };
    } catch (error) {
      console.error('Error al crear un detalle de pedido:', error);
      throw error;
    }
  }

  // Eliminar detalle
  async delete(id_detalle_pedido) {
    try {
      const [result] = await db
        .promise()
        .query('DELETE FROM Detalle_Pedido WHERE id_detalle_pedido = ?', [
          id_detalle_pedido,
        ]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar un detalle de pedido:', error);
      throw error;
    }
  }
}

export default new DetallePedidoService();
