const { celebrate, Segments, Joi  } = require('celebrate');

module.exports = {

    index: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.number().required()
        })
    }),

    store: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            user_id: Joi.number().required()
        }),

        [Segments.BODY]: Joi.object().keys({
            zipcode: Joi.string().required(),
            street: Joi.string().required(),
            number: Joi.string().required(),
        })
    }),

    update: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
            user_id: Joi.number().required()
        }),

        [Segments.BODY]: Joi.object().keys({
            zipcode: Joi.string(),
            street: Joi.string(),
            number: Joi.string(),
        })
    }),

    destroy: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),
        
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
            user_id: Joi.number().required()
        }),
    })
}