module.exports = app => {
  const controller = app.controllers.toDoList;
  
  app.route('/api/v1/todolist')
    .get(controller.listTask)
    .post(controller.saveTask);
  
  app.route('/api/v1/todolist/:taskId')
      .delete(controller.removeTask);
}