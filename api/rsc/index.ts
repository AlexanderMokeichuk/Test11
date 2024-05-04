import cors = require('cors');
import express from 'express';
import mongoose from 'mongoose';
import config from './config';

const app = express();

const port = 8000;
const localhost = `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use(express.static('./src/public'));


const run = async () => {
  await mongoose.connect(config.mongoose.db);

  app.listen(port, () => {
    console.log(`Server running at ${localhost}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();