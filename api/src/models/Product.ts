import mongoose, { Schema, Types } from 'mongoose';
import { ProductFront } from '../type';

const ProductSchema = new Schema<ProductFront>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  image: {
    type: String || null,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
}, {
  versionKey: false,
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;