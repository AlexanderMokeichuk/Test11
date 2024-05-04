import { Schema, model } from 'mongoose';

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  },
);

const Category = model('Category', CategorySchema);

export default Category;