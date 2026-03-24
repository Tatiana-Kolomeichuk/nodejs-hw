import { model, Schema } from 'mongoose';
import { TAGS } from '../constants/tags.js';


const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
      trim: true,
    },
    tag: {
      type: String,
      default: 'Todo',
      enum:  [...TAGS],
    },
  },
  { timestamps: true } // автоматично додає поля createdAt та updatedAt
);

noteSchema.index({ title: 'text', content: 'text' });

export const Note = model('Note', noteSchema);
