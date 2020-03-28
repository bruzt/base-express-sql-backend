const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    index: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.number().required()
        })
    }),

    store: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.number().required()
        }),

        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required()
        })
    }),

    update: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
            user_id: Joi.number().required()
        }),

        [Segments.BODY]: Joi.object().keys({
            name: Joi.string()
        })
    }),

    destroy: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
            user_id: Joi.number().required()
        })
    })
}