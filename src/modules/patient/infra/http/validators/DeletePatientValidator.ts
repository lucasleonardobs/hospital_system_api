import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.PARAMS]: {
        cpf: Joi.string().required(),
    },
});
