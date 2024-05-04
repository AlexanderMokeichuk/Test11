import { Model } from 'mongoose';

export interface UserFront {
  username: string;
  password: string;
  displayName: string;
  phoneNumber: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

export type UserModel = Model<UserFront, unknown, UserMethods>;