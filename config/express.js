const express = require('express');
/*body-parser é um middleware capaz de converter o body da requisição para vários formatos.
Um desses formatos é o json.*/
const bodyParser = require('body-parser');
/*permite organizar a configuração da nossa aplicação e estender em qualquer arquivo.*/
const config = require('config');
/*consign detecta e importa as rotas, os controllers e os models na aplicação Express */
const consign = require('consign');
const mongoose = require('mongoose');
const TaskModel = require('../api/model/TaskModel');

mongoose.connect('mongodb+srv://renataleitesg:101010@cluster0.c7lil.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});


module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set('port', process.env.PORT || config.get('server.port'));

  // MIDDLEWARES
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://to-do-list-renata.netlify.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
  app.use(bodyParser.json());

  //ENDPOINTS
  consign({ cwd: 'api' })
    .then('controllers')
    .then('routes')
    .into(app);

  return app;
};