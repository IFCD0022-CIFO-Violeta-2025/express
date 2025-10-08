let todosDB = []; // sumulacion database
let currentId = 1;

/**
 * Obtiene todas las tareas
 * @params {Object} filters: Filtros Opcionales (completed, priority)
 * @returns {Array} Lista de tareas
*/

function getAll(filters = {}) {
    let result = [...todosDB];
    // filtrar por estado completado
    if (filters.completed !== undefined) {
        const completedBool =
            typeof filters.completed === "string"
                ? filters.completed === "true"
                : Boolean(filters.completed);
        result = result.filter(todo => todo.completed === completedBool);
    }
    // filtrar por prioridad
    if (filters.priority)
        result = result.filter(todo => todo.priority === filters.priority);

    return result;
}

/**
 * Crear una nueva Tarea
 * @params {Object} todoDATA
 * @returns {Array} Lista de tareas
*/
function create(todoDATA) {
    const newTodoDB = {
        id: currentId++,
        title: todoDATA.title,
        completed: todoDATA.completed || false, // valor defecto: false
        priority: todoDATA.priority || "medium", // valor defecto: "medium"
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    todosDB.push(newTodoDB);
    return newTodoDB;
}

/**
 * Obtener una tarea por ID
 * @params {number} id - ID de la tarea
 * @returns {Object|null} Tarea encontrada o null
 */
function getById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return null;
    return todosDB.find(todo => todo.id === numericId) || null;
}

/**
 * Actualizar una tarea existente
 * @params {number} id - ID de la tarea
 * @params {Object} updateData - Datos a actualizar
 * @returns {Object|null} Tarea actualizada o null
 */
function update(id, updateData) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return null;
    const index = todosDB.findIndex(todo => todo.id === numericId);
    if (index === -1) return null;

    const current = todosDB[index];
    const updated = {
        ...current,
        title: updateData.title !== undefined ? updateData.title : current.title,
        completed: updateData.completed !== undefined ? updateData.completed : current.completed,
        priority: updateData.priority !== undefined ? updateData.priority : current.priority,
        updatedAt: new Date().toISOString(),
    };
    todosDB[index] = updated;
    return updated;
}

/**
 * Eliminar una tarea por ID
 * @params {number} id - ID de la tarea
 * @returns {boolean} true si se eliminó, false si no se encontró
 */
function deleteById(id) {
    const numericId = Number(id);
    if (Number.isNaN(numericId)) return false;
    const initialLength = todosDB.length;
    todosDB = todosDB.filter(todo => todo.id !== numericId);
    return todosDB.length < initialLength;
}

/**
 * Obtener estadísticas de las tareas
 * @returns {Object} Estadísticas:
 *   - completed: cantidad de tareas completadas
 *   - pending: cantidad de tareas pendientes
 *   - byPriority: { low: X, medium: Y, high: Z }
 */
function getStats() {
    const completed = todosDB.filter(t => t.completed).length;
    const pending = todosDB.length - completed;
    const byPriority = {
        low: todosDB.filter(t => t.priority === "low").length,
        medium: todosDB.filter(t => t.priority === "medium").length,
        high: todosDB.filter(t => t.priority === "high").length,
    };
    return { completed, pending, byPriority };
}

module.exports = {
    getAll,
    create,
    getById,
    update,
    deleteById,
    getStats
}