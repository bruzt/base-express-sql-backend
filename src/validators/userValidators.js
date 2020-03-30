const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    show: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
    }),

    store: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(), 
            email: Joi.string().email().required(), 
            age: Joi.number().required(), 
            password: Joi.string().required().min(6),
        }),
    }),

    update: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),

        [Segments.BODY]: Joi.object().keys({
            name: Joi.string(), 
            email: Joi.string().email(), 
            age: Joi.number(), 
            password: Joi.string().min(6),
        }),
    }),

    destroy: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        }),
    })
}