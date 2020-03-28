const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {

    show: celebrate({
        [Segments.HEADERS]: Joi.object().keys({
            authorization: Joi.string().required()
        })
        .unknown(),

        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().email(),
            street: Joi.string(),
            tech: Joi.string(),
        }),
    }),
}