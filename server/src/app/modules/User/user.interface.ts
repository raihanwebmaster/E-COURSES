import { Model, Types } from 'mongoose';

export interface ICourse {
  courseId: Types.ObjectId;
}

export interface IUser {
  _id: Types.ObjectId,
  name: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  avatar: {
    public_id: string;
    url: string;
  };
  role: 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  isVerified: boolean;
  courses: Array<ICourse>;
  isDeleted: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserExistsByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}
