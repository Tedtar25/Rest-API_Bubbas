import db from '../config/bubba_db.js'

class productoService {
    async getAll() {
        try {
            const [rows] = await db.promise().query('SELECT * FROM Producto');
            return rows;
        } catch (error) {
            console.log('Error al obtener todos los productos:', error)
            throw error;
        }
    }

    async getById(id) {
        try {
            const [rows] = await db.promise().query('SELECT * FROM Producto WHERE id_producto =?', [id]);
            return rows[0] || null;
        } catch (error) {
            console.error(`Error al obtener usuario por Id:`, error);
            throw error;
        }
    }

    async create({ nombre, descripcion, precio, disponible, categoria }) {
        try {
            const [result] = await db.promise().query(
                'INSERT INTO Producto (nombre, descripcion, precio, disponible, categoria) VALUES (?, ?, ?, ?, ?)',
                [nombre, descripcion, precio, disponible, categoria]
            )
            return { id_producto: result.insertId, nombre, descripcion, precio, disponible, categoria }
        } catch (error) {
            console.error('Error al crear un producto:', error);
            throw error;
        }
    }

    async update(id, { precio, disponible, categoria }) {
        try {
            const [result] = await db.promise().query(
                'UPDATE Producto SET precio = ?, disponible = ?, categoria = ? WHERE id_producto = ?',
                [precio, disponible, categoria, id]
            )
            return result.affectedRows > 0
                ? { id_producto: id, nombre, descripcion, precio, disponible, categoria }
                : null;
        } catch (error) {
            console.error(`Error al actualizar el producto`, error)
            throw error;
        }
    }

    async delete(id){
        try{
            const [result] = await db.promise().query(
                'DELETE FROM Producto WHERE id_producto = ?', [id]
            )
            return result.affectedRows > 0;
        } catch(error){
            console.error(`No se ha podido eliminar el producto`, error)
            throw error;
        }
    }

}

export default new productoService();