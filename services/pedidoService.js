import db from '../config/bubba_db.js';

class PedidoService {
  async getAll() {
    try {
      const [rows] = await db.promise().query('SELECT * FROM Pedido');
      return rows;
    } catch (error) {
      console.error('Error al obtener todos los pedidos:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const [rows] = await db
        .promise()
        .query('SELECT * FROM Pedido WHERE id_pedido = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al obtener pedido por ID:', error);
      throw error;
    }
  }

  async getByUser(id_usuario) {
    try {
      const [rows] = await db
        .promise()
        .query('SELECT * FROM Pedido WHERE id_usuario = ?', [id_usuario]);

      return rows;
    } catch (error) {
      console.error('Error al obtener pedidos por usuario:', error);
      throw error;
    }
  }

  async create({ id_usuario, total, estado = 'pendiente' }) {
    try {
      const [result] = await db
        .promise()
        .query(
          'INSERT INTO Pedido (id_usuario, total, estado) VALUES (?, ?, ?)',
          [id_usuario, total, estado]
        );

      return { id_pedido: result.insertId, id_usuario, total, estado };
    } catch (error) {
      console.error('Error al crear un pedido:', error);
      throw error;
    }
  }

  async createWithDetails({ id_usuario, productos }) {
    const connection = await db.promise().getConnection();

    try {
      await connection.beginTransaction();

      let total = 0;
      const detalles = [];

      for (const item of productos) {
        const { id_producto, cantidad } = item;

        const [rowsProd] = await connection.query(
          'SELECT precio FROM Producto WHERE id_producto = ?',
          [id_producto]
        );

        if (rowsProd.length === 0) {
          throw new Error(`Producto con id ${id_producto} no existe`);
        }

        const precio = rowsProd[0].precio;
        const subtotal = precio * cantidad;
        total += subtotal;

        detalles.push({ id_producto, cantidad, precio, subtotal });
      }

      const [resultPedido] = await connection.query(
        'INSERT INTO Pedido (id_usuario, total, estado) VALUES (?, ?, ?)',
        [id_usuario, total, 'pendiente']
      );

      const id_pedido = resultPedido.insertId;

      for (const det of detalles) {
        await connection.query(
          'INSERT INTO Detalle_Pedido (id_pedido, id_producto, cantidad) VALUES (?, ?, ?)',
          [id_pedido, det.id_producto, det.cantidad]
        );
      }

      await connection.commit();

      return {
        id_pedido,
        id_usuario,
        total,
        estado: 'pendiente',
        detalles,
      };
    } catch (error) {
      await connection.rollback();
      console.error('Error al crear pedido completo:', error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async delete(id) {
    try {
      const [result] = await db
        .promise()
        .query('DELETE FROM Pedido WHERE id_pedido = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
      throw error;
    }
  }
}

export default new PedidoService();
