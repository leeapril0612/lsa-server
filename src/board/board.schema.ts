import * as Joi from 'joi';

export const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});