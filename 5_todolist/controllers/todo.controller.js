const todoModel = require("../models/todo.model");
const { createTODOSchema } = require("../validators/todo.validator");

/**
 * Obtiene todas las tareas
 * GET /api/v1/todos?completed=true&priority=high
*/
function getAllTodos(req, res) {
    try {
        const filters = {};
        if (req.query.completed)
            filters.completed = req.query.completed;
        if (req.query.priority)
            filters.priority = req.query.priority;

        const todosFiltered = todoModel.getAll(filters);

        res.status(200).json({
            success: true,
            message: "Todas las tareas de la DB",
            data: todosFiltered
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las tareas",
            error: error.message
        });
    }
}


/**
 * Crear nueva tarea
 * GET /api/v1/todos?completed=true&priority=high
*/
function createTodo(req, res) {
    try {
        // validacion con Joi
        const { error } = createTODOSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validacion datos Todo fallida!",
                errors: error.details.map(error => error.message)
            });
        }

        const newTodo = todoModel.create(req.body)

        res.status(201).json({
            success: true,
            message: "Tarea Creada correctamente",
            data: newTodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear la tareas",
            error: error.message
        });
    }

}

function getOnlyOne(req, res){
    try {

        const id = req.params.id;
        const todo = todoModel.getByID(id)
        

        res.status(200).json({
            success: true,
            message: "Las tarea de la DB",
            data: todo
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener la tarea",
            error: error.message
        });
    }
}

// TODO: 
// updateTodo()
function updateTodo(req, res) {
    try {
    const { error } = createTODOSchema.validate(req.body);
    if (error) {
            return res.status(400).json({
                success: false,
                message: "Validacion datos Todo fallida!",
                errors: error.details.map(error => error.message)
            });
        }
        const id = req.params.id;
        const todoData =  req.body;
        const todoUpdate = todoModel.update(id, todoData)
        res.status(200).json({
            success: true,
            message: "Las tarea de la DB está cambiada",
            data: todoUpdate
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al cambiar las tareas",
            error: error.message
        });
    }
}
// deleteTodo()
// getStats

module.exports = {
    getAllTodos,
    createTodo,
    getOnlyOne,
    updateTodo
}