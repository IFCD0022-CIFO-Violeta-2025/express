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
function getById(id){
    const todo = todosDB.find(todo => todo.id === id);
    if(todo){
        return todo;
    }
    return null;  
}

/**
 * Actualizar una tarea existente
 * @params {number} id - ID de la tarea
 * @params {Object} updateData - Datos a actualizar
 * @returns {Object|null} Tarea actualizada o null
 */
// TODO: Implementar update(id, updateData)
function update(id, updateData){
    const index = todosDB.findIndex(todo => todo.id === id);
    if(index !== -1){
        const newTodo = {
            id: id,
            title: updateData.title,
            completed: updateData.completed,
            priority: updateData.priority,
            createdAt: updateData.createdAt,
            updateAt: updateData.updateAt
        }
        todosDB[index] = newTodo;
        return newTodo;
    }
    return null;
}

/**
 * Eliminar una tarea por ID
 * @params {number} id - ID de la tarea
 * @returns {boolean} true si se eliminó, false si no se encontró
 */
// TODO: Implementar deleteById(id)
function deleteById(id){
    const index = todosDB.findIndex(todo => todo.id === id);
    if(index !== -1){
        todosDB.splice(index, 1);
        return true;
    }
    return false;
}

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