module.exports = app => {
    const toDoListDB = app.data.toDoList;
    const controller = {};
  
    controller.listToDo = (req, res) => res.status(200).json(toDoListDB);
  
    return controller;
  }