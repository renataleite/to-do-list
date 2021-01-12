module.exports = app => {
  const controller = app.controllers.toDoList;
  
  app.route('/api/v1/todolist')
    .get(controller.listToDo)
    .post(controller.saveToDo);
}