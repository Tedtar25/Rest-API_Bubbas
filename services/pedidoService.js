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
      const [rows] = await db.promise().query('SELECT * FROM Pedido WHERE id_pedido = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al obtener pedido por ID:', error);
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

  async delete(id) {
    try {
      const [result] = await db.promise().query('DELETE FROM Pedido WHERE id_pedido = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
      throw error;
    }
  }
}

export default new PedidoService();
