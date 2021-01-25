//uuidv4 gera IDs únicos(uuid) ao salvar os dados
const uuidv4 = require('uuid/v4');

module.exports = app => {
  //importa o mock que retorna um objeto
  const toDoListDB = app.data.toDoList;
  const controller = {};
  //é criada uma constante que faz a desestruturação do objeto, retornando um objeto com Array[data].
  //desestruturação possibilita extrair dados de arrays ou objetos em variáveis distintas.
  const {
    toDoList: toDoListMock,
  } = toDoListDB;

  controller.listTask = (req, res) => res.status(200).json(toDoListDB);

  controller.saveTask = (req, res) => {
    //push no array toDoListMock com os dados recebidos 
    toDoListMock.data.push({
      id: uuidv4(),
      task: req.body.task,
      done: req.body.done,
    });
    //retorna um status code 201 “created ” e o próprio objeto salvo
    res.status(201).json(toDoListMock);
  }
  controller.removeTask = (req, res) => {
    const {
      taskId,
    } = req.params;
    //percorre a lista de toDoListMock e executa o método "findIndex" do array, 
    //se achar a task com mesmo ID o retorno é sua posição na lista, senão encontrar,
    //-1 é retornado para constante foundTaskIndex.
    const foundTaskIndex = toDoListMock.data.findIndex(task => task.id === taskId);
    if (foundTaskIndex ===-1) {
      /*Se a task não for encontrada, é retornado o status code 404, uma mensagem em JSON, dizendo que a tarefa não foi encontrada 
      e a lista das tarefas atualizadas. */
      res.status(404).json({
        message: "Tarefa não encontrada na base de dados.",
        sucess: false,
        toDoList: toDoListMock,
      });
    } else {
      // o método splice altera a lista e remove elementos antigos 
      toDoListMock.data.splice(foundTaskIndex, 1);
      //é retornado o status code 404, uma mensagem em JSON, dizendo que a tarefa foi encontrada e a lista das tarefas atualizadas.
      res.status(200).json({
        message: "Tarefa encontrada e deletada com sucesso.",
        sucess: true,
        toDoList: toDoListMock,
      });
    }
  };
  controller.updateTask = (req, res) => {
    //pega o taskId
    const {
      taskId,
    } = req.params;
    // findIndex procura o index da task, se encontrado retorna a posição na lista, senão -1 é retornado.
    const foundTaskIndex = toDoListMock.data.findIndex(task => task.id ===taskId);
    
    if (foundTaskIndex === -1) {
      res.status(404).json({
        message: 'Task não encontrada.',
        sucess: false,
        toDoList: toDoListMock,
      });
    } else {
      //cria uma nova task
      const newTask = {
        id: taskId,
        task: req.body.task,
        done: req.body.done,
      };
      //atualiza a lista adicionando o novo cliente e substituindo o cliente deletado
      toDoListMock.data.splice(foundTaskIndex, 1, newTask);

      res.status(200).json({
        message: 'Task encontrada e atualizada com sucesso',
        sucess: true,
        toDoList: toDoListMock,
      });
    }
  }   
  return controller;
}