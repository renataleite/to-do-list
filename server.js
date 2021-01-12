//arquivo que inicia o servidor dentro da pasta raiz do projeto 
const app = require('./config/express')();
const port = app.get('port');

// RODANDO NOSSA APLICAÇÃO NA PORTA SETADA
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});