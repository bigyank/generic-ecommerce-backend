const { Segments, Joi } = require('celebrate');

const loginValidator = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().required(),
    }),
};

const signupValidator = {
    [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().required(),
        name: Joi.string().required(),
    }),
};

// only validate authorization headers
const getProfileValidator = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            authorization: Joi.string(),
        })
        .unknown(),
};

module.exports = { loginValidator, signupValidator, getProfileValidator };
