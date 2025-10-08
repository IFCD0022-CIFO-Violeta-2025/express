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
    deleteTo
}