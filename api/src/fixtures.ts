import mongoose from 'mongoose';
import config from './config';
import Category from './models/Category';
import User from './models/User';
import Product from './models/Product';

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

const collections = ['categories', "users", "products"];

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  for (const collection of collections) {
    await dropCollection(db, collection);
  }

  const [userOne, userTwo] = await User.create(
    {
      username: 'Alex',
      password: '1234',
      phoneNumber: "+9963e343",
      displayName: "test",
      token: crypto.randomUUID(),
    },
    {
      username: 'Alex2',
      password: '1234',
      phoneNumber: "+9963e343343",
      displayName: "test2",
      token: crypto.randomUUID(),
    },
  );

  const [categoryOne, categoryTwo, categoryThe] = await Category.create({
    categoryName: "Monitors",
  }, {
    categoryName: "Keyboards",
  }, {
    categoryName: "Laptops",
  })

  await Product.create({
    title: "24 Монитор игровой KTC H24T19",
    description: "черный [1920x1080 (FullHD)@165 Гц, IPS, WLED, 1000:1, 300 Кд/м², 178°/…",
    price: 11999,
    image: "fixtures/monitorTwo.jpg",
    user: userOne,
    category: categoryOne,
  },{
    title: "Монитор игровой Lenovo R27q-30",
    description: "черный [2560x1440 @165 Гц, IPS, WLED, 1000:1, 350 Кд/м², 178°/178°, HD…",
    price: 17999,
    image: "fixtures/monitorOne.jpg",
    user: userOne,
    category: categoryOne,
  }, {
    title: "Клавиатура проводная Keychron Q3 [Q3M3]",
    description: "механическая Gateron G Pro Brown, клавиш - 87, USB, черная",
    price: 14999,
    image: "fixtures/keyboard.jpg",
    user: userTwo,
    category: categoryTwo,
  });
  await db.close();
};

void run();
