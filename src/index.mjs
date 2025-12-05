import express from 'express';
import db from '../config/bubba_db.js';

import routerApi from '../routes/rutasGeneral.js';
import loggingMiddleware from '../middlewares/loggingMiddleware.js';
import logErrors from '../middlewares/logErrors.js';
import errorHandler from '../middlewares/errorHandlers.js';

const app = express();
const port = process.env.PORT || 666;

// Middlewares globales
app.use(express.json());
app.use(loggingMiddleware);
app.use(logErrors);
app.use(errorHandler);

// Ruta base para probar
app.get('/', (req, res) => {
  res.send(`
    Las rutas son:<br>
    GET  /v1/usuarios                     - Listar usuarios<br>
    GET  /v1/productos                    - Listar productos<br>
    GET  /v1/pedidos                      - Listar pedidos<br>
    GET  /v1/detalles                     - Listar detalles<br>
    GET  /v1/pedidos/pedido/:id_pedido    - Obtener detalles por ID de pedido<br>
    POST /v1/pedidos/completo             - Crear un pedido completo
  `);
});


// Rutas de la API
routerApi(app);

// Arrancar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port} de la bestia`);
});
