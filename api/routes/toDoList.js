module.exports = app => {
  const controller = app.controllers.TaskController;
  
  app.route('/api/v1/todolist')
    .get(controller.listTask)
    .post(controller.saveTask);
  // taskId guarda o valor dinâmico
  app.route('/api/v1/todolist/:taskId')
      .delete(controller.removeTask)
      .put(controller.updateTask);
}