import { celebrate, Segments, Joi } from 'celebrate';

export default celebrate({
    [Segments.QUERY]: {
        filter: Joi.number().valid(-1, 0, 1, 2).default(-1)
    },
});
