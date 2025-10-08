let todosDB = []; // sumulacion database
let currentId = 0;

/**
 * Obtiene todas las tareas
 * @params {Object} filters: Filtros Opcionales (completed, priority)
 * @returns {Array} Lista de tareas
*/

function getAll(filters = {}) {
    let result = [...todosDB];
    // filtrar por estado completado
    if (filters.completed)
        result.filter(todo => todo.completed === filters.completed);
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
// TODO: Implementar getById(id)

/**
 * Actualizar una tarea existente
 * @params {number} id - ID de la tarea
 * @params {Object} updateData - Datos a actualizar
 * @returns {Object|null} Tarea actualizada o null
 */
// TODO: Implementar update(id, updateData)

/**
 * Eliminar una tarea por ID
 * @params {number} id - ID de la tarea
 * @returns {boolean} true si se eliminó, false si no se encontró
 */
// TODO: Implementar deleteById(id)

/**
 * Obtener estadísticas de las tareas
 * @returns {Object} Estadísticas:
 *   - completed: cantidad de tareas completadas
 *   - pending: cantidad de tareas pendientes
 *   - byPriority: { low: X, medium: Y, high: Z }
 */
// TODO: Implementar getStats()

module.exports = {
    getAll,
    create
    // TODO: Exportar getById, update, deleteById, getStats
}