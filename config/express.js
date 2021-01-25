const express = require('express');
/*body-parser é um middleware capaz de converter o body da requisição para vários formatos.
Um desses formatos é o json.*/
const bodyParser = require('body-parser');
/*permite organizar a configuração da nossa aplicação e estender em qualquer arquivo.*/
const config = require('config');
/*consign detecta e importa as rotas, os controllers e os models na aplicação Express */
const consign = require('consign');
module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-renata.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    return next();
  });
  app.use(bodyParser.json());

  //ENDPOINTS
  consign({ cwd: 'api' })
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};