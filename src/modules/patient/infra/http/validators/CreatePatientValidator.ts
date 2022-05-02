import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        date_of_birth: Joi.date().required(),
        phone_number: Joi.string().required(),
        cpf: Joi.string().required(),
        cep: Joi.string().required(),
        address: Joi.string().required(),
        gender: Joi.string().required(),
    },
});
