import usuarioRouter from '../routes/usuarioRoutes.js';

function routerApi(app) {
  app.use('/v1/usuarios', usuarioRouter);
}

export default routerApi;
