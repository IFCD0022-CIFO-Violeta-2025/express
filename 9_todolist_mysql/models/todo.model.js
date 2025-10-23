const connex = require("../mysql/connex");

/**
 * Obtiene todas las tareas
 * @params {Object} filters: Filtros Opcionales (completed, priority)
 * @returns {Array} Lista de tareas
*/

function getAll(filters = {}) {
    let result = [...todosDB];
    // filtrar por estado completado
    if (filters.completed)
        result = result.filter(todo => todo.completed === (filters.completed === 'true'));
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
async function create(todoDATA) {
    try {
        const [result] = await connex.query("insert into todos (title) values (?)", [todoDATA.title]);
        return result;
    } catch (error) {
        res.status(500).json({ error });
    }
}

/**
 * Obtener una tarea por ID
 * @params {number} id - ID de la tarea
 * @returns {Object|null} Tarea encontrada o null
 */
// TODO: Implementar getById(id)
function getByID(id = 0) {
    // filtrar por ID
    result = {}
    if (!isNaN(id) && id > 0)
        result = todosDB.find(todo => todo.id === Number(id));

    return result;
}


/**
 * Actualizar una tarea existente
 * @params {number} id - ID de la tarea
 * @params {Object} updateData - Datos a actualizar
 * @returns {Object|null} Tarea actualizada o null
 */
function update(id, todoDATA) {
    const index = todosDB.findIndex(elemento => elemento.id === Number(id));

    if (index < 0) return ({}); // No lo hemos encontrado

    const oldTodo = todosDB[index];
    const newTodoDB = {
        id: Number(id),
        title: todoDATA.title,
        completed: todoDATA.completed,
        priority: todoDATA.priority,
        createdAt: oldTodo.createdAt,
        updatedAt: new Date().toISOString(),
    }

    todosDB.splice(index, 1, newTodoDB); // Borramos antiguo elemento e insertamos modificado

    return newTodoDB;
}


/**
 * Eliminar una tarea por ID
 * @params {number} id - ID de la tarea
 * @returns {boolean} true si se eliminó, false si no se encontró
 */
function deleteID(id) {
    const index = todosDB.findIndex(elemento => elemento.id === Number(id));

    if (index < 0) return false; // No lo hemos encontrado

    const deletedTodo = todosDB[index];
    todosDB.splice(index, 1); // Eliminamos el elemento

    return deletedTodo;
}


/**
 * Obtener estadísticas de las tareas
 * @returns {Object} Estadísticas:
 *   - completed: cantidad de tareas completadas
 *   - pending: cantidad de tareas pendientes
 *   - byPriority: { low: X, medium: Y, high: Z }
 */
// TODO: Implementar getStats()
function getStats()
{
    let completed = 0;
    let pending = 0;
    let low = 0;
    let medium = 0;
    let high = 0;

    todosDB.forEach(elem => {
        elem.completed ? completed++ : pending++;
        if (elem.priority === "low") low++
        if (elem.priority === "medium") medium++
        if (elem.priority === "high") high++
    })

    estadisticas = 
        {
            estadisticas : {
                completed: completed,
                pending: pending,
                byPriority : {
                    low: low,
                    medium: medium,
                    high: high
                }
            }
        }
    return estadisticas
}

/**
 * Devuelve booleano indicando si existe un ID
  * @params {id: num} - id a encontrar
 * @returns {bool} Indica si se ha encontrado la tarea de Id
 */
 function existeID(id)
 {
    const encontrado = todosDB.findIndex(elem => elem.id == Number(id)) >= 0 ?  true :  false;
    return encontrado
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