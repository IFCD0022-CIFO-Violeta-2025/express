const todoModel = require("../models/todo.model");
const { createTODOSchema, updateTODOSchema, getTODOSchema, deleteTODOSchema} = require("../validators/todo.validator");

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
 * Obtiene una única tarea
 * GET /api/v1/todo?id=0
*/
function getTodo(req, res) {
    const { error } = getTodoSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            success: false,
            message: "Validación id getTodo fallida!",
            errors: error.details.map(error => error.message)
        })
    }
    try {
        const todo = todoModel.getTodo(req.params.id);
        console.log(todo);
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Tarea no encontrada"
            });
        }
        res.status(200).json({
            success: true,
            message: "Tarea encontrada",
            data: todo
        });
    } catch (error) {
        console.log("Error al obtener la tarea:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor al obtener la tarea",
            errorBody: error,
            error: error.message // opcional: útil para depuración
        });

    }
}

/**
 * UPDATE una única tarea
 * PUT /api/v1/update
*/
function updateTodo(req, res) {

    const {error } = updateTODOSchema.validate({'id': req.params.id, ...req.body});
    if (error) {
        return res.status(400).json({
            success: false,
            message:"Error de validación al actualizar Todo",
            extra: error,
            errors: Array.isArray(error) ? error.map(error => error.message) : error.message
        })

    }
    try {
        const todo = todoModel.update(req.params.id, req.body);
        if (!todo) {
            res.status(403).json({
                success: false,
                message: "Tarea no encontrada"
            });
        }
        res.status(200).json({
            success: true,
            message: "Tarea actualizada",
            data: todo
        });
    } catch (error) {
        console.log("Error al actualizar la tarea:", error);
    }
    }

/**
 * DELETE una única tarea
 * DELETE /api/v1/delete?id=0
*/
function deleteTodo(req, res) {
    const { error } = deleteTODOSchema.validate({'id': req.params.id});
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Error de validación al eliminar Todo",
            errors: error.details.map(detail => detail.message)
        });
    }

    try {
        const todo = todoModel.deleteById({'id': req.params.id}); // usar el id validado del body
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Tarea no encontrada"
            });
        }

        res.status(200).json({
            success: true,
            message: "Tarea eliminada correctamente",
            data: todo
        });
    } catch (error) {
        console.log("Error al eliminar la tarea:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor"
        });
    }
}

// getStats

module.exports = {
    getAllTodos,
    createTodo,
    getTodo,
    updateTodo,
    deleteTodo
}