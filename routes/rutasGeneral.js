import usuarioRouter from '../routes/usuarioRoutes.js';
import productoRouter from '../routes/productoRoutes.js';
import pedidoRouter from '../routes/pedidoRoutes.js';

function routerApi(app) {
  app.use('/v1/usuarios', usuarioRouter);
  app.use('/v1/productos', productoRouter);
  app.use('/v1/pedidos', pedidoRouter);
}

export default routerApi;
