const todoModel = require("../models/todo.model");
const { createTODOSchema, updateTODOSchema } = require("../validators/todo.validator");

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

/**
 * Obtener una tarea por ID
 * GET /api/v1/todo/:id
 */
// TODO: Implementar getTodoById

function getTodoById(req, res) {
    try {
        const taskId = parseInt(req.params.id);
        const taskById = todoModel.getById(taskId);

        res.status(200).json({
            success: true,
            message: "Tarea encontrada con Id:"+taskId+" en la DB",
            data: taskById
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener la tarea por Id:"+req.params.id,
            error: error.message
        });
    }
}


/**
 * Actualizar una tarea por ID
 * PUT /api/v1/todo/:id
 */
// TODO: Implementar updateTodo

function updateTodo(req, res) {
    try {
        // validacion con Joi
        const { error } = updateTODOSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validacion datos Todo fallida!",
                errors: error.details.map(error => error.message)
            });
        }



        const updatedTodo = todoModel.update(req.params.id, req.body)

        res.status(201).json({
            success: true,
            message: "Tarea Actualizada correctamente",
            data: updatedTodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar la tarea",
            error: error.message
        });
    }

}

/**
 * Eliminar una tarea por ID
 * DELETE /api/v1/todo/:id
 */
// TODO: Implementar deleteTodo

/**
 * Obtener estadísticas de las tareas
 * GET /api/v1/todos/stats
 * Debe retornar: cantidad de tareas completadas/no completadas y cantidad por prioridad (low, medium, high)
 */
// TODO: Implementar getStats

module.exports = {
    getAllTodos,
    createTodo,
    getTodoById,
    updateTodo
    // TODO: Exportar getTodoById, updateTodo, deleteTodo, getStats
}