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
  res.send('Hola mundo');
});

// Rutas de la API
routerApi(app);

// Arrancar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port} de la bestia`);
});
