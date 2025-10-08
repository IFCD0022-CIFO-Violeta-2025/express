let todosDB = [{
    id: 1,
    title: "Comprar alimentos",
    completed: false,
    priority: "medium",
    createdAt: "2024-09-01T10:15:30.000Z",
    updatedAt: "2024-09-02T12:20:35.000Z",
  },
  {
    id: 2,
    title: "Hacer ejercicio",
    completed: true,
    priority: "high",
    createdAt: "2024-08-25T08:00:00.000Z",
    updatedAt: "2024-08-25T09:30:00.000Z",
  },
  {
    id: 3,
    title: "Leer un libro",
    completed: false,
    priority: "low",
    createdAt: "2024-07-15T14:45:00.000Z",
    updatedAt: "2024-07-20T16:00:00.000Z",
  },
  {
    id: 4,
    title: "Enviar correos",
    completed: true,
    priority: "medium",
    createdAt: "2024-10-05T07:10:10.000Z",
    updatedAt: "2024-10-06T08:15:15.000Z",
  },
  {
    id: 5,
    title: "Lavar el coche",
    completed: false,
    priority: "low",
    createdAt: "2024-06-30T11:25:00.000Z",
    updatedAt: "2024-07-01T12:30:00.000Z",
  }]; // sumulacion database
  
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
function getStats(){
    const completed = todosDB.reduce((count, todo)=>{
        if (todo.completed){
            return count +1;
        } else {
            return count;
        }
    },0)

    const pending = todosDB.reduce((count, todo)=>{
        if (!todo.completed){
            return count +1;
        } else {
            return count;
        }
    },0)

    let l = 0, m = 0, h = 0;

    todosDB.forEach(todo => {
        switch(todo.priority){
            case 'low':
                l ++;
                break;
            case 'medium':
                m++;
                break;
            case 'high':
                h++
                break;        
        }
    })
    const priority = {low: l, medium: m, high: h};

    const estadisticas = {
        completed: completed,
        pending: pending,
        byPriority: priority
    }
    return estadisticas;
}

module.exports = {
    getAll,
    create,
    getById, 
    update, 
    deleteById, 
    getStats
}