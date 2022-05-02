import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.PARAMS]: {
        filter: Joi.number().valid(-1, 0, 1, 2).required()
    },
});
