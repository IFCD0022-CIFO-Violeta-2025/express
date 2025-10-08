const Joi = require('joi');
const todosDB = require('../models/todo.model');
const todosIds = Array.isArray(todosDB)
    ? todosDB.map(todo => todo.id)
    : []; // Si no es array, devolvemos un array vacío para evitar errores

const createTODOSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "El título no puede estar vacío",
            "string.min": "El título ha de tener mas de 3 caract.",
            "string.max": "ha de tener menos de 100 caract."
        }),
    priority: Joi.alternatives().try(
        Joi.number().valid(1, 2, 3),
        Joi.string().valid("low", "medium", "high")
    ).messages({
        "any.only": "La prioridad debe ser 1 (low), 2 (medium), 3 (high) o una cadena equivalente"
    })
});

const updateTODOSchema = Joi.object({
    id: Joi.number()
        .valid(...todosIds)
        .required()
        .messages({
            "any.required": "El campo 'id' es obligatorio",
            "any.only": "El 'id' no existe en la base de datos",
            "number.base": "El 'id' debe ser un número"
        }),

    title: Joi.string()
        .min(3)
        .max(100)
        .messages({
            "string.empty": "El título no puede estar vacío",
            "string.min": "El título ha de tener mas de 3 caract.",
            "string.max": "ha de tener menos de 100 caract."
        }),
    priority: Joi.alternatives().try(
         Joi.number().valid(1, 2, 3),
        Joi.string().valid("low", "medium", "high")
    ).messages({
        "any.only": "La prioridad debe ser 1 (low), 2 (medium), 3 (high) o una cadena equivalente"
    }),
    completed: Joi.boolean().
    messages({
        "boolean.base": "El campo 'completed' debe ser verdadero o falso"
    })
})

const getTODOSchema = Joi.object({
    id: Joi.number()
        .valid(...todosIds)
        .required()
        .messages({
            "any.required": "El campo 'id' es obligatorio",
            "any.only": "El 'id' no existe en la base de datos",
            "number.base": "El 'id' debe ser un número"
        })
    })

const deleteTODOSchema = Joi.object({
    id: Joi.number()
        .valid(...todosIds)
        .required()
        .messages({
            "any.required": "El campo 'id' es obligatorio",
            "any.only": "El 'id' no existe en la base de datos",
            "number.base": "El 'id' debe ser un número"
        })
    })
    
    
    
module.exports = {
    createTODOSchema,
    updateTODOSchema,
    getTODOSchema,
    deleteTODOSchema
}