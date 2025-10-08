const todoModel = require("../models/todo.model");

const {todosDB} = todoModel;


const userInfo = ((req, res, next) => {
  const fecha = new Date().toISOString();
  console.log(`[${fecha}] ${req.method} ${req.url}`);
  //console.log(todosDB);
  next();
});

module.exports = {
  userInfo
}