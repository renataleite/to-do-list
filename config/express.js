const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
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