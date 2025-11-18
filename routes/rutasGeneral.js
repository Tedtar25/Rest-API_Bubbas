import usuarioRouter from '../routes/usuarioRoutes.js';
import productoRouter from '../routes/productoRoutes.js';
import pedidoRouter from '../routes/pedidoRoutes.js';
import detallePedidoRouter from '../routes/detallePedidoRoutes.js'

import express from express;

const router = express.router();

function routerApi(app) {
  app.use('/v1/usuarios', usuarioRouter);
  app.use('/v1/productos', productoRouter);
  app.use('/v1/pedidos', pedidoRouter);
  app.use('/v1/detalle_Pedido', detallePedidoRouter)
}

router.post('/v1/nuevo',async (req, res, next) =>{
  try{
    
  }catch(error){
    next(error)
  }
})

export default routerApi;
