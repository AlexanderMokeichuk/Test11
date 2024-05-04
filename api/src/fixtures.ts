import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';

const dropCollection = async (
  db: mongoose.Connection,
  collectionName: string,
) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, sipping drop..`);
  }
};

const collections = ['category'];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  await Category.create({
    categoryName: "Monitors",
  }, {
    categoryName: "Keyboards",
  }, {
    categoryName: "Laptops",
  })

  await db.close();
};

void run();
