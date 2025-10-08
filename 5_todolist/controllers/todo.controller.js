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

// TODO: Implementar getTodoById
/**
 * Obtener una tarea por ID
 * GET /api/v1/todo/:id
 */
function getTodoById(req, res) {
    const id = req.body.id
    try {
        todoModel.getTodoById(id)

        if  (todosFiltered !== 'undefined') {
            res.status(200).json({
                success: false,
                message: "Encontrado elemento de Id: " + id,
                data: todosFiltered
            });
        }
        else {
            res.status(204).json({
                success: true,
                message: "NO se ha encontrado elemento de Id: " + id,
                data: {}
            });
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el elmento de Id: " + id,
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
    const { error } = createTODOSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validacion datos Todo fallida!",
            errors: error.details.map(error => error.message)
        });
    }


    const id = req.params.id

    if (!todoModel.existeID(id)) {
        res.status(204).json({
                success: false,
                message: "No se ha encontrado elemento de Id: " + id,
                data: {}
        })
    }

    try {
        const todoUpdated = todoModel.update(id, req.body)
        res.status(200).json({
                success: true,
                message: "Actualizado elemento de Id: " + id,
                data: todoUpdated
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener el elmento de Id: " + id,
            error: error.message
        });
    }
}



/**
 * Eliminar una tarea por ID
 * DELETE /api/v1/todo/:id
 */
// TODO: Implementar deleteTodo
function deleteTodo(req, res) {
    const id = req.params.id

    if (!todoModel.existeID(id)) {
        res.status(204).json({
            success: false,
            message: "No existe el elmento de Id: " + id,
        })
    }

    try {
        const todoUpdated = todoModel.deleteID((id))
        res.status(200).json({
                success: true,
                message: "Eliminado el elemento de Id: " + id,
                data: todoUpdated
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al eliminar el elmento de Id: " + id,
            error: error.message
        });
    }
}


/**
 * Obtener estadísticas de las tareas
 * GET /api/v1/todos/stats
 * Debe retornar: cantidad de tareas completadas/no completadas y cantidad por prioridad (low, medium, high)
 */
// TODO: Implementar getStats
function getStats(req, res) {
    try {
        const todoStats = todoModel.getStats()
        res.status(200).json({
                success: true,
                message: "Obtenidas estadísticas de TODOs" ,
                data: todoStats
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener estadísticas de TODOs: ",
            error: error.message
        });
    }
}


module.exports = {
    getAllTodos,
    createTodo,
    // TODO: Exportar getTodoById, updateTodo, deleteTodo, getStats
    getTodoById,
    updateTodo,
    deleteTodo,
    getStats
}