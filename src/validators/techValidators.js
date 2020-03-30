const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    show: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            tech_id: Joi.number().required()
        })
    }),

    store: celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required()
        })
    }),

    update: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        }),

        [Segments.BODY]: Joi.object().keys({
            name: Joi.string()
        })
    }),

    destroy: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    })
}