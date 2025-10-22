const connection = require("../my_sql_connection");
let currentId = 0;

/**
 * Obtiene todas las tareas
 * @params {Object} filters: Filtros Opcionales (completed, priority)
 * @returns {Array} Lista de tareas
*/

async function getAll(filters = {}) {
     let [result] = await connection.query("select * from todos");
    // filtrar por estado completado
    /*
if (filters.completed !== undefined) {
    const completedNum = filters.completed === 'true' ? 1 : 0;
    result = result.filter(todo => todo.completed === completedNum);
}
    // filtrar por prioridad
if (filters.priority)
        {result = result.filter(todo => todo.priority === filters.priority)}*/
    return result;
}

async function getByID(id) {
    const todo = todosDB.find(todo => todo.id === parseInt(id))
    await connection.query(`insert into todos (dato) values ("${dato}")`);
    return todo;
}

/**
 * Crear una nueva Tarea
 * @params {Object} todoDATA
 * @returns {Array} Lista de tareas
*/
async function create({ title, completed = 0, priority = "medium" }) {
    try {
        const [result] = await connection.query(
            "INSERT INTO todos (title, completed, priority) VALUES (?, ?, ?)",
            [title, completed, priority]
        );
        console.log("Insertado OK! Datos insertados:", result );
        return { id: result.insertId, title, completed, priority };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

function update(id, todoData) {
    if(todoData) {
        connection.query(`update todos set dato = "${todoData}" where id = ${id}`);
    }
}

function deleteTo(id) {
  connection.query(`delete from todos where id = ${id}`);
}
/*
function getStats() {
    console.log("getStats is called")
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
}*/
// TODO: 
// getByID()+
// update()+
// delete()+
// getStats(): Cantidad de tareas completadas/no completadas y cantidad de tareas en "low"|"midium"|"high"+

module.exports = {
    getAll,
    create,
    getByID,
    update,
    deleteTo,
    //getStats
}
