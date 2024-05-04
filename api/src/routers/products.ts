import express from 'express';
import auth, { RequestWithUser } from '../middleware/auth';
import { ProductFront } from '../type';
import Product from '../models/Product';
import { imagesUpload } from '../multer';
import mongoose from 'mongoose';

const productsRouter = express.Router();

productsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const user = (req as RequestWithUser).user!;

  try {
    const postProduct: ProductFront = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.file ? req.file.filename : null,
      user: user._id,
      category: req.body.category,
    };

    const post = new Product(postProduct);
    await post.save();

    return res.send(post);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(422).send(e);
    }
    next();
  }
});

productsRouter.get('/', async (_req, res, next) => {
  try {
    const products = await Product.find();

    return res.send(products);
  } catch (e) {
    next();
  }
});

export default productsRouter;