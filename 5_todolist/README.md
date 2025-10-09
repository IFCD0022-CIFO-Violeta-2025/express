# Template TODO List

## Caracteristicas API

API REST para gestionar una lista de tareas (TODO list) con funcionalidades CRUD completas y filtros opcionales. Permite crear, consultar, actualizar y eliminar tareas, además de obtener estadísticas sobre el estado y prioridad de las mismas.

## Tecnologías

- Node.js
- Express 5.1.0
- Joi 18.0.1 (validación de datos)
- dotenv 17.2.3 (gestión de variables de entorno)

## Estructura proyecto

```
5_todolist/
├── api.js                          # Punto de entrada de la aplicación
├── config/
│   └── config.js                   # Configuración general
├── controllers/
│   └── todo.controller.js          # Lógica de negocio para TODOs
├── middlewares/
│   └── error.middleware.js         # Middleware para manejo de errores
├── models/
│   └── todo.model.js               # Modelo de datos (simula base de datos)
├── routes/
│   └── todo.routes.js              # Definición de rutas
├── validators/
│   └── todo.validator.js           # Esquemas de validación con Joi
├── package.json
└── .env                            # Variables de entorno
```

## Instalación

```bash
npm install
```

## Config Variables entorno:
- Para guardar datos sensibles (acceso MySQL, APIkey Tokens, acceso servidor mail, JWT autenticacion)
```
PORT=3000
```

## Rutas ó Endpoint

### Obtener todas las tareas
```http
GET /api/v1/todos?completed=true&priority=high
```

**Query Params (opcionales):**
- `completed` (boolean): Filtrar por estado
- `priority` (string): Filtrar por prioridad (low, medium, high)

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Todas las tareas de la DB",
  "data": [
    {
      "id": 0,
      "title": "Ejemplo de tarea",
      "completed": false,
      "priority": "medium",
      "createdAt": "2025-10-08T10:00:00.000Z",
      "updatedAt": "2025-10-08T10:00:00.000Z"
    }
  ]
}
```

### Crear nueva tarea
```http
POST /api/v1/todo
```

**Body (JSON):**
```json
{
  "title": "Nueva tarea",
  "completed": false,
  "priority": "high"
}
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Tarea Creada correctamente",
  "data": {
    "id": 1,
    "title": "Nueva tarea",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-10-08T10:00:00.000Z",
    "updatedAt": "2025-10-08T10:00:00.000Z"
  }
}
```

### Obtener tarea por ID
```http
GET /api/v1/todo/:id
```

**Parámetros de ruta:**
- `id` (number): ID de la tarea a obtener

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Encontrado elemento de Id: 1",
  "data": {
    "id": 1,
    "title": "Nueva tarea",
    "completed": false,
    "priority": "high",
    "createdAt": "2025-10-08T10:00:00.000Z",
    "updatedAt": "2025-10-08T10:00:00.000Z"
  }
}
```

**Respuesta no encontrado (404):**
```json
{
  "success": false,
  "message": "NO se ha encontrado elemento de Id: 1",
  "data": {}
}
```

### Actualizar tarea
```http
PUT /api/v1/todo/:id
```

**Parámetros de ruta:**
- `id` (number): ID de la tarea a actualizar

**Body (JSON):**
```json
{
  "title": "Tarea actualizada",
  "completed": true,
  "priority": "low"
}
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Actualizado elemento de Id: 1",
  "data": {
    "id": 1,
    "title": "Tarea actualizada",
    "completed": true,
    "priority": "low",
    "createdAt": "2025-10-08T10:00:00.000Z",
    "updatedAt": "2025-10-08T12:30:00.000Z"
  }
}
```

**Respuesta no encontrado (204):**
```json
{
  "success": false,
  "message": "No se ha encontrado elemento de Id: 1",
  "data": {}
}
```

### Eliminar tarea
```http
DELETE /api/v1/todo/:id
```

**Parámetros de ruta:**
- `id` (number): ID de la tarea a eliminar

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Eliminado el elemento de Id: 1",
  "data": {
    "id": 1,
    "title": "Tarea eliminada",
    "completed": false,
    "priority": "medium",
    "createdAt": "2025-10-08T10:00:00.000Z",
    "updatedAt": "2025-10-08T10:00:00.000Z"
  }
}
```

**Respuesta no encontrado (204):**
```json
{
  "success": false,
  "message": "No existe el elmento de Id: 1"
}
```

### Obtener estadísticas
```http
GET /api/v1/todos/stats
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Obtenidas estadísticas de TODOs",
  "data": {
    "estadisticas": {
      "completed": 5,
      "pending": 3,
      "byPriority": {
        "low": 2,
        "medium": 4,
        "high": 2
      }
    }
  }
}
```
