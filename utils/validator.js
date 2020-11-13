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
const headerValidator = {
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

const makeOrderValidator = {
    [Segments.BODY]: Joi.object().keys({
        orderItems: Joi.array()
            .items(
                Joi.object()
                    .keys({
                        product: Joi.string().required(),
                        name: Joi.string().required(),
                        image: Joi.string().required(),
                        price: Joi.number().required(),
                        qty: Joi.number().required(),
                        countInStock: Joi.number().required(),
                    })
                    .required()
            )
            .required(),
        shippingAddress: Joi.object()
            .keys({
                address: Joi.string().required(),
                city: Joi.string().required(),
                postalCode: Joi.string().required(),
                country: Joi.string().required(),
            })
            .required(),
        paymentMethod: Joi.string().required(),
        taxPrice: Joi.number().required(),
        itemsPrice: Joi.number().required(),
        shippingPrice: Joi.number().required(),
        totalPrice: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object()
        .keys({
            ...authHeader,
        })
        .unknown(),
};

const userUpdateAdmin = {
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        isAdmin: Joi.boolean().required(),
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
    headerValidator,
    updateProfileValidator,
    makeOrderValidator,
    userUpdateAdmin,
};
