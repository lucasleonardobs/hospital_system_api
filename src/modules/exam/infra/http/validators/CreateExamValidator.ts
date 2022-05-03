import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.BODY]: {
        cpf: Joi.string().required(),
        exam: Joi.string().required(),
        doctor_name: Joi.string().required(),
        scheduled_at: Joi.date().required(),
    },
});
