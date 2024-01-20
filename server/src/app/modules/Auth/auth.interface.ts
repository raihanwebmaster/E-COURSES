import { USER_ROLE } from '../User/user.constant';

export type ILoginUser = {
  email: string;
  password: string;
};

export type IActivationToken = {
  token: string;
  activationCode: string;
};

export type IActivationRequest = {
  activation_token: string;
  activation_code: string;
};

export type TUserRole = keyof typeof USER_ROLE;

export type ITokenOption = {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none' | undefined;
  secure?: boolean;
};

export type TSocialAuth = {
  email: string;
  name: string;
  avatar: string;
  password: string;
}
