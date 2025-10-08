let todosDB = [
    {
        "id":0,
        "title":"need things",
        "completed":false,"priority":"low",
        "createdAt":"2025-10-08T08:58:09.963Z",
        "updatedAt":"2025-10-08T08:58:09.964Z"},
    {
        "id":1,
        "title":"cfsdcdsc",
        "completed":false,
        "priority":"low",
        "createdAt":"2025-10-08T08:59:52.571Z",
        "updatedAt":"2025-10-08T08:59:52.571Z"},
    {
        "id":2,
        "title":"dcdcd",
        "completed":false,
        "priority":"low",
        "createdAt":"2025-10-08T08:59:58.940Z",
        "updatedAt":"2025-10-08T08:59:58.940Z"},
    {
        "id":3,
        "title":"cdscsc",
        "completed":false,
        "priority":"low",
        "createdAt":"2025-10-08T09:00:07.023Z",
        "updatedAt":"2025-10-08T09:00:07.023Z"},
    {
        "id":4,
        "title":"cdsd",
        "completed":false,
        "priority":"low",
        "createdAt":"2025-10-08T09:00:12.620Z",
        "updatedAt":"2025-10-08T09:00:12.620Z"}
]; // sumulacion database
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

function getByID(id){
    const todo = todosDB.find(todo => todo.id === parseInt(id))
    return todo;
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
        completed: todoDATA.completed ?? false, // valor defecto: false
        priority: todoDATA.priority ?? "medium", // valor defecto: "medium"
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }

    todosDB.push(newTodoDB);
    return newTodoDB;
}

function update(id, todoData) {
    if(todoData) {
        const todo = todosDB.find(todo => todo.id === parseInt(id))

        if (todoData.title) todo.title = todoData.title;
        if (todoData.completed) todo.completed = todoData.completed;
        if (todoData.priority) todo.priority = todoData.priority
        todo.updatedAt = new Date().toISOString();
        
        const indice = todosDB.findIndex(p => p.id === parseInt(id));
        todosDB.splice(indice, 1, todo);
        return todosDB;
    }
}

function deleteTo(id) {
    const indice = todosDB.findIndex(p => p.id === parseInt(id))
    delete todosDB[indice]
    todosDB = todosDB.filter(todo => todo !== null)
    return todosDB;
}

function getStats() {
    const completionStats = todosDB.reduce((acc, todo) => {
        if (todo.completed) acc.completed += 1;
        else acc.notCompleted += 1;
        return acc;
    }, { completed: 0, notCompleted: 0 });

    const priorityStats = todosDB.reduce((acc, todo) => {
        if (todo.priority === "low") acc.low += 1;
        else if (todo.priority === "medium") acc.medium += 1;
        else if (todo.priority === "high") acc.high += 1;
        return acc;
    }, { low: 0, medium: 0, high: 0 });

    return {
        ...completionStats,
        priorities: priorityStats
    };
}
// TODO: 
// getByID()+
// update()+
// delete()+
// getStats(): Cantidad de tareas completadas/no completadas y cantidad de tareas en "low"|"midium"|"high"

module.exports = {
    getAll,
    create,
    getByID,
    update,
    deleteTo,
    getStats
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