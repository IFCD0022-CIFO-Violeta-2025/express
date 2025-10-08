const todoModel = require("../models/todo.model");
const { createTODOSchema } = require("../validators/todo.validator");

/**
 * Obtiene todas las tareas
 * GET /api/v1/todos?completed=true&priority=high
*/
function getAllTodos(req, res) {
    try {
        const filters = {};
        if (req.query.completed !== undefined) filters.completed = req.query.completed;
        if (req.query.priority) filters.priority = req.query.priority;

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
 * Obtener una tarea por ID
 */
function getTodoById(req, res) {
    try {
        const todo = todoModel.getById(req.params.id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Tarea no encontrada"
            });
        }

        res.status(200).json({
            success: true,
            message: "Tarea obtenida correctamente",
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

/**
 * Crear una tarea
 */
function createTodo(req, res) {
    try {
        const { error } = createTODOSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validación de datos fallida",
                errors: error.details.map(err => err.message)
            });
        }

        const newTodo = todoModel.create(req.body);

        res.status(201).json({
            success: true,
            message: "Tarea creada correctamente",
            data: newTodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al crear la tarea",
            error: error.message
        });
    }
}

/**
 * Actualizar una tarea por ID
 * PUT /api/v1/todo/:id
 */
function updateTodo(req, res) {
    try {
        const updated = todoModel.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({
                success: false,
                message: "Tarea no encontrada"
            });
        }
        res.status(200).json({
            success: true,
            message: "Tarea actualizada correctamente",
            data: updated
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
function deleteTodo(req, res) {
    try {
        const deleted = todoModel.deleteById(req.params.id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Tarea no encontrada"
            });
        }
        res.status(200).json({
            success: true,
            message: "Tarea eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar la tarea",
            error: error.message
        });
    }
}

/**
 * Obtener estadísticas de las tareas
 * GET /api/v1/todos/stats
 * Debe retornar: cantidad de tareas completadas/no completadas y cantidad por prioridad (low, medium, high)
 */
function getStats(req, res) {
    try {
        const stats = todoModel.getStats();
        res.status(200).json({
            success: true,
            message: "Estadísticas de tareas",
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener estadísticas",
            error: error.message
        });
    }
}

module.exports = {
    getAllTodos,
    createTodo,
    getTodoById,
    updateTodo,
    deleteTodo,
    getStats
}