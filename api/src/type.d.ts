import { Model, Schema } from 'mongoose';
import Types = module

export interface UserFront {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}
export interface UserApi extends UserFront {
  _id: Types.ObjectId;
}

export interface ProductFront {
  title: string,
  price: number,
  description: string,
  image: string | null,
  user: Types.ObjectId,
  category: Types.ObjectId,
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFront, unknown, UserMethods>;