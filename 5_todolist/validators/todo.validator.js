const Joi = require('joi');

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
    priority: Joi.string(),
    completed: Joi.boolean()
});

const updateTODOSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            "string.empty": "El título no puede estar vacío",
            "string.min": "El título ha de tener mas de 3 caract.",
            "string.max": "ha de tener menos de 100 caract."
        }),
    priority: Joi.string()
        .valid("low", "medium", "high")
        .required()
        .messages({
            "any.only": "La prioridad debe ser 'low', 'medium' o 'high'"
        }),
    completed: Joi.boolean()
    .required()
});



module.exports = {
    createTODOSchema,
    updateTODOSchema
}

// TODO: 
// validar todos los params de las Todos