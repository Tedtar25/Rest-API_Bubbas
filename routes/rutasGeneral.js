import usuarioRouter from '../routes/usuarioRoutes.js';
import productoRouter from '../routes/productoRoutes.js';

function routerApi(app) {
  app.use('/v1/usuarios', usuarioRouter);
  app.use('/v1/productos', productoRouter)
}

export default routerApi;
