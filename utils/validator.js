const { Segments, Joi } = require('celebrate');

const formFeilds = {
    email: Joi.string().email(),
    password: Joi.string().required(),
};

const authHeader = {
    authorization: Joi.string().required(),
};

const loginValidator = {
    [Segments.BODY]: Joi.object().keys({
        ...formFeilds,
    }),
};

const signupValidator = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        ...formFeilds,
    }),
};

// feilds other that authorization are unknown
const getProfileValidator = {
    [Segments.HEADERS]: Joi.object()
        .keys({
            ...authHeader,
        })
        .unknown(),
};

const updateProfileValidator = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
    }),
    [Segments.HEADERS]: Joi.object()
        .keys({
            ...authHeader,
        })
        .unknown(),
};

module.exports = {
    loginValidator,
    signupValidator,
    getProfileValidator,
    updateProfileValidator,
};
