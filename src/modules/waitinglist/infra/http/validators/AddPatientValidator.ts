import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        cpf: Joi.string().required(),
        priority: Joi.number().valid(0, 1, 2).required()
    },
});
