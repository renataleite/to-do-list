const uuidv4 = require('uuid/v4');

module.exports = app => {
  const toDoListDB = app.data.toDoList;
  const controller = {};

  const {
    toDoList: toDoListMock,
  } = toDoListDB;
  controller.listToDo = (req, res) => res.status(200).json(toDoListDB);

  controller.saveToDo = (req, res) => {
    toDoListMock.data.push({
      id: uuidv4(),
      task: req.body.task,
      done: req.body.done,
    });

    res.status(201).json(toDoListMock);
  }
  return controller;
}