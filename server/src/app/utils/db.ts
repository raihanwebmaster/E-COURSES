/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import config from '../config';

const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url as string);
  } catch (error: any) {
    setTimeout(connectDB, 500);
  }
};

export default connectDB;
