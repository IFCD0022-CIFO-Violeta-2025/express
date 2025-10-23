const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");


router.get("/", (req, res) => {
    res.json({"saludo": "hola"})
});

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

router.post("/todo", todoController.createTodo)

/**
 * @route GET /api/v1/todo/:id
 * @desc: Obtener una tarea por ID
 * @access Public
 */
// TODO: router.get("/todo/:id", todoController.getTodoById)
router.get("/todo/:id", todoController.getTodoById)

/**
 * @route PUT /api/v1/todo/:id
 * @desc: Actualizar una tarea por ID
 * @access Public
 */
// TODO: router.put("/todo/:id", todoController.updateTodo)
router.put("/todo/:id", todoController.updateTodo)

/**
 * @route DELETE /api/v1/todo/:id
 * @desc: Eliminar una tarea por ID
 * @access Public
 */
// TODO: router.delete("/todo/:id", todoController.deleteTodo)
router.delete("/todo/:id", todoController.deleteTodo)

/**
 * @route GET /api/v1/todos/stats
 * @desc: Obtener estadísticas de las tareas
 * @access Public
 */
// TODO: router.get("/todos/stats", todoController.getStats)
router.get("/todos/stats", todoController.getStats)


module.exports = router;