import usuarioRouter from '../routes/usuarioRoutes.js';
import productoRouter from '../routes/productoRoutes.js';
import pedidoRouter from '../routes/pedidoRoutes.js';
import detallePedidoRouter from '../routes/detallePedidoRoutes.js';

function routerApi(app) {
  app.use('/v1/usuarios', usuarioRouter);
  app.use('/v1/productos', productoRouter);
  app.use('/v1/pedidos', pedidoRouter);
  app.use('/v1/detalles', detallePedidoRouter);
}

export default routerApi;


/*cloudflared tunnel --url http://localhost:666*/