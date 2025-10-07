const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

/**
 * @route GET /api/v1/todos
 * @desc: Obtener todas las tareas (confiltro opcionales)
 * @query complete (boolean), priority (low|midium|high)
 * @access Public
*/

router.get("/todos", todoController.getAllTodos)

/**
 * @route POST /api/v1/todos
 * @desc: Crear una nueva tarea
 * @access Public
*/

router.post("/todos", todoController.createTodo)


// TODO: 
// get :id
// put
// delete
// stats


module.exports = router;