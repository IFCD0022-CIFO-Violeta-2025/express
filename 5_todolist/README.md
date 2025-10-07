# Template TODO List

## Caracteristicas API

## Tecnologías

## Estructura proyecto

## Instalación



## Config Variables entorno:
- Para guardar datos sensibles (acceso MySQL, APIkey Tokens, acceso servidor mail, JWT autenticacion)
```
PORT=3000
```

## Rutas ó Endpoint
```http
GET /api/v1/todos?completed=true&priority=high
```

** Query Params (opcionales): **
- `completed` (boolean): Filtrar por estado
- `priority` (string): Filtrar por prioridad (low, medium, high)