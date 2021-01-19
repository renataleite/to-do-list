const uuidv4 = require('uuid/v4');

module.exports = app => {
  const toDoListDB = app.data.toDoList;
  const controller = {};

  const {
    toDoList: toDoListMock,
  } = toDoListDB;
  controller.listTask = (req, res) => res.status(200).json(toDoListDB);

  controller.saveTask = (req, res) => {
    toDoListMock.data.push({
      id: uuidv4(),
      task: req.body.task,
      done: req.body.done,
    });

    res.status(201).json(toDoListMock);
  }
  controller.removeTask = (req, res) => {
    const {
      taskId,
    } = req.params;

    const foundTaskIndex = toDoListMock.data.findIndex(task => task.id === taskId);
    if (foundTaskIndex ===-1) {
      res.status(404).json({
        message: "Tarefa não encontrada na base de dados.",
        sucess: false,
        toDoList: toDoListMock,
      });
    } else {
      toDoListMock.data.splice(foundTaskIndex, 1);
      res.status(200).json({
        message: "Tarefa encontrada e deletada com sucesso.",
        sucess: true,
        toDoList: toDoListMock,
      });
    }
  };
  controller.updateTask = (req, res) => {
    const {
      taskId,
    } = req.params;

    const foundTaskIndex = toDoListMock.data.findIndex(task => task.id ===taskId);
    
    if (foundTaskIndex === -1) {
      res.status(404).json({
        message: 'Task não encontrada na base.',
        sucess: false,
        toDoList: toDoListMock,
      });
    } else {
      const newTask = {
        id: taskId,
        task: req.body.task,
        done: req.body.done,
      };
      
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