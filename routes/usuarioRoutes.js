import express from 'express';
import usuarioService from '../services/usuarioServices.js';

const router = express.Router();

//Obtener todos los usuarios
router.get('/', async (req, res, next) => {
    try {
        const users = await usuarioService.getAll();
        res.json(users)
    } catch (error) {
        next(error)
    }
});

//Obtener un usuario por su ID
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await usuarioService.getById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' })
        }
    } catch (error) {
        next(error);
    }
});

//Agregar un nuevo usuario
router.post('/', async (req, res, next) => {
    try {
        const { nombre, email, contrasenia } = req.body;
        const newUser = await usuarioService.create({ nombre, email, contrasenia });
        res.status(201).json({
            message: 'Usuario agregado',
            data: newUser
        });
    } catch (error) {
        next(error)
    }
});

//Modificar datos de un usuario
router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { nombre, email, contrasenia } = req.body;
        const updateUser = await usuarioService.update(id, { nombre, email, contrasenia });
        if (updateUser) {
            res.status(200).json({
                message: 'Usuario actualizado',
                data: updateUser
            });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' })
        }
    } catch (error) {
        next(error);
    }
});

//Eliminar un usuario
router.delete('/:id', async (req, res, next) => {
    try {
    const { id } = req.params;
    const deletedUser = await usuarioService.delete(id);

    if (deletedUser) {
      res.status(200).json({
        message: 'User Deleted',
        data: deletedUser,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

export default router;