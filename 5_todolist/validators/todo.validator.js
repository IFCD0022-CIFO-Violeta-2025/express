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

    completed: Joi.boolean()
        .required()
        .messages({}),

    priority: Joi.string()
        .valid('low', 'medium', 'high')
        .required()
        .messages({}),

    createdAt: Joi.string()
        .required()
        .messages({}),

    updateAt: Joi.string()
        .required()
        .messages({}),
});

module.exports = {
    createTODOSchema
}

// TODO: 
// validar todos los params de las Todos