//uuidv4 gera IDs únicos(uuid) ao salvar os dados
const uuidv4 = require('uuid/v4');
const TaskModel = require('../model/TaskModel');

module.exports = app => {
  const controller = {};

  controller.listTask = (req, res) => {
    TaskModel.find(null, function (err, list) {
      res.status(200).json({
        message: 'Listado com sucesso',
        sucess: true,
        data: list,
      });
    })
  }

  controller.saveTask = (req, res) => {
    task = new TaskModel()
    task.id = uuidv4()
    task.task = req.body.task
    task.done = req.body.done
    task.save(function (err) {
      res.status(201).json({
        message: 'Task inserida com sucesso',
        sucess: true,
        data: task,
      });
    })
  }

  controller.removeTask = (req, res) => {
    TaskModel.deleteOne(req.params.taskId, function (err, task) {
      res.status(200).json({
        message: "Tarefa deletada com sucesso.",
        sucess: true,
      });
    })
  };

  controller.updateTask = (req, res) => {
    TaskModel.findById(req.params.taskId, function (err, task) {
      task.task = req.body.task
      task.done = req.body.done
      task.save()
      res.status(200).json({
        message: 'Task encontrada e atualizada com sucesso',
        sucess: true,
        toDoList: task,
      });
    })
  }
  return controller;
}