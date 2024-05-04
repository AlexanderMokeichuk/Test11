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
      price: parseInt(req.body.price),
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

productsRouter.get('/', async (req, res, next) => {
  const query = req.query.product as string;

  try {
    if (query) {
      if (!mongoose.Types.ObjectId.isValid(query)) {
        return res.status(422).send({ error: 'Not found product!!' });
      }
      const product = await Product
        .findOne({_id: query})
        .populate(
          "user",
          "username phoneNumber")
        .populate(
          "category",
          "categoryName"
        );


      return res.send(product);
    }
    const products = await Product.find().select('title price image');

    return res.send(products);
  } catch (e) {
    next();
  }
});
productsRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).send({ error: 'Not found products!!' });
    }


    const products = await Product.find({ category: id }).select('title price image');

    return res.send(products);
  } catch (e) {
    next();
  }
});

productsRouter.delete('/:id', auth, async (req, res, next) => {
  const id = req.params.id;
  const user = (req as RequestWithUser).user!;
  try {

    const check = await Product.find({_id: id});

    if (user._id.toString() == check[0].user.toString()) {
      await Product.findOneAndDelete({_id: id});
      return res.send({ message: 'Deleted!', id: id });
    }


    return res.status(403).send({ error: "Access is denied!!" });
  } catch (e) {
    next();
  }
});

export default productsRouter;