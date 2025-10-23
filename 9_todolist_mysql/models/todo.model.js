const connex = require("../mysql/connex");

/**
 * Obtiene todas las tareas
 * @params {Object} filters: Filtros Opcionales (completed, priority)
 * @returns {Array} Lista de tareas
*/
async function getAll(filters = {}) {
    try {
        let query = "SELECT * FROM todos WHERE 1=1";
        const params = [];

        // filtrar por estado completado
        if (filters.completed !== undefined) {
            query += " AND completed = ?";
            params.push(filters.completed === 'true' ? 1 : 0);
        }

        // filtrar por prioridad
        if (filters.priority) {
            query += " AND priority = ?";
            params.push(filters.priority);
        }

        const [rows] = await connex.query(query, params);
        return rows;
    } catch (error) {
        throw error;
    }
}

/**
 * Crear una nueva Tarea
 * @params {Object} todoDATA
 * @returns {Array} Lista de tareas
*/
async function create(todoDATA) {
    try {
        const [result] = await connex.query("INSERT INTO todos (title) VALUES (?)", [todoDATA.title]);
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Obtener una tarea por ID
 * @params {number} id - ID de la tarea
 * @returns {Object|null} Tarea encontrada o null
 */
async function getByID(id = 0) {
    try {
        if (!isNaN(id) && id > 0) {
            const [rows] = await connex.query("SELECT * FROM todos WHERE id = ?", [id]);
            return rows[0] || null;
        }
        return null;
    } catch (error) {
        throw error;
    }
}


/**
 * Actualizar una tarea existente
 * @params {number} id - ID de la tarea
 * @params {Object} updateData - Datos a actualizar
 * @returns {Object|null} Tarea actualizada o null
 */
async function update(id, todoDATA) {
    try {
        const updates = [];
        const params = [];

        if (todoDATA.title !== undefined) {
            updates.push("title = ?");
            params.push(todoDATA.title);
        }
        if (todoDATA.completed !== undefined) {
            updates.push("completed = ?");
            params.push(todoDATA.completed ? 1 : 0);
        }
        if (todoDATA.priority !== undefined) {
            updates.push("priority = ?");
            params.push(todoDATA.priority);
        }

        if (updates.length === 0) return null;

        updates.push("updatedAt = NOW()");
        params.push(id);

        const query = `UPDATE todos SET ${updates.join(", ")} WHERE id = ?`;
        const [result] = await connex.query(query, params);

        if (result.affectedRows === 0) return null;

        // Obtener la tarea actualizada
        const [rows] = await connex.query("SELECT * FROM todos WHERE id = ?", [id]);
        return rows[0];
    } catch (error) {
        throw error;
    }
}


/**
 * Eliminar una tarea por ID
 * @params {number} id - ID de la tarea
 * @returns {boolean} true si se eliminó, false si no se encontró
 */
async function deleteID(id) {
    try {
        // Primero obtener la tarea antes de eliminarla
        const [rows] = await connex.query("SELECT * FROM todos WHERE id = ?", [id]);

        if (rows.length === 0) return false;

        const deletedTodo = rows[0];
        await connex.query("DELETE FROM todos WHERE id = ?", [id]);

        return deletedTodo;
    } catch (error) {
        throw error;
    }
}


/**
 * Obtener estadísticas de las tareas
 * @returns {Object} Estadísticas:
 *   - completed: cantidad de tareas completadas
 *   - pending: cantidad de tareas pendientes
 *   - byPriority: { low: X, medium: Y, high: Z }
 */
async function getStats() {
    try {
        const [completedResult] = await connex.query(
            "SELECT COUNT(*) as count FROM todos WHERE completed = 1"
        );
        const [pendingResult] = await connex.query(
            "SELECT COUNT(*) as count FROM todos WHERE completed = 0"
        );
        const [priorityResult] = await connex.query(
            "SELECT priority, COUNT(*) as count FROM todos GROUP BY priority"
        );

        const byPriority = {
            low: 0,
            medium: 0,
            high: 0
        };

        priorityResult.forEach(row => {
            if (row.priority) {
                byPriority[row.priority] = row.count;
            }
        });

        const estadisticas = {
            estadisticas: {
                completed: completedResult[0].count,
                pending: pendingResult[0].count,
                byPriority: byPriority
            }
        };

        return estadisticas;
    } catch (error) {
        throw error;
    }
}

/**
 * Devuelve booleano indicando si existe un ID
 * @params {id: num} - id a encontrar
 * @returns {bool} Indica si se ha encontrado la tarea de Id
 */
async function existeID(id) {
    try {
        const [rows] = await connex.query("SELECT id FROM todos WHERE id = ?", [id]);
        return rows.length > 0;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAll,
    create,
    getByID,
    update,
    deleteID,
    getStats,
    existeID
}