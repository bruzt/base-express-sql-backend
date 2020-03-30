const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    index: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.number().required()
        }),
    }),

    store: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.number().required(),
            tech_id: Joi.number().required()
        }),
    }),

    destroy: celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.number().required(),
            tech_id: Joi.number().required()
        }),
    }),
}