import db from '../config/bubba_db.js';

class UsuarioService {
  async getAll() {
    try {
      const [rows] = await db.promise().query('SELECT * FROM Usuario');
      return rows;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const [rows] = await db.promise().query('SELECT * FROM Usuario WHERE id_usuario = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw error;
    }
  }

  async create({ nombre, email, contrasenia }) {
    try {
      const [result] = await db.promise().query(
        'INSERT INTO Usuario (nombre, email, contrasenia) VALUES (?, ?, ?)',
        [nombre, email, contrasenia]
      );

      return { id_usuario: result.insertId, nombre, email, contrasenia };
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }

  async update(id, { nombre, email, contrasenia }) {
    try {
      const [result] = await db.promise().query(
        'UPDATE Usuario SET nombre = ?, email = ?, contrasenia = ? WHERE id_usuario = ?',
        [nombre, email, contrasenia, id]
      );

      return result.affectedRows > 0
        ? { id_usuario: id, nombre, email, contrasenia }
        : null;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const [result] = await db.promise().query('DELETE FROM Usuario WHERE id_usuario = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }

  async login(email, contrasenia) {
    try {
      const [rows] = await db
        .promise()
        .query('SELECT * FROM Usuario WHERE email = ? AND contrasenia = ?', [email, contrasenia]);

      return rows[0] || null;
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}

export default new UsuarioService();
