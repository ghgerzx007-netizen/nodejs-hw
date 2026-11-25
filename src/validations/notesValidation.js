import { Segments, Joi } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    search: Joi.string().allow(''),
    tag: Joi.valid(...TAGS),
  }),
};
// post
export const createNotesSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1).required(),
    content: Joi.string().allow(''),
    tag: Joi.valid(...TAGS),
  }),
};
export const objectIdValidator = (value, helpers) => {
  if (isValidObjectId(value)) {
    return value;
  }

  return helpers.message('error');
};
export const noteIdSchema = {
  [Segments.PARAMS]: {
    noteId: Joi.string().custom(objectIdValidator).required(),
  },
};



export const updateNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(1),
    content: Joi.string().allow(''),
    tag: Joi.valid(...TAGS),
  }),
  ...noteIdSchema,
};
