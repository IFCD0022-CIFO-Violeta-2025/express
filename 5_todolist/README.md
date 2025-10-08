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

### TODO: Obtener tarea por ID
```http
GET /api/v1/todo/:id
```

### TODO: Actualizar tarea
```http
PUT /api/v1/todo/:id
```

### TODO: Eliminar tarea
```http
DELETE /api/v1/todo/:id
```

### TODO: Obtener estadísticas
```http
GET /api/v1/todos/stats
```

**Respuesta esperada:**
- Cantidad de tareas completadas/no completadas
- Cantidad de tareas por prioridad (low, medium, high)
