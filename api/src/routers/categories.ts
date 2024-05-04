import express from 'express';
import Category from '../models/Category';

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (_req, res, next) => {
  try {
    const categories = await Category.find();

    return res.send(categories);
  } catch (e) {
    next();
  }
});

export default categoriesRouter;
