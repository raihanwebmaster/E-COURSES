import { z } from 'zod';
import { isStrongPassword } from '../User/user.validation';

const userRegistrationActiveSchema = z.object({
  body: z.object({
    activation_token: z.string(),
    activation_code: z.string(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const logoutValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
    accessToken: z.string({
      required_error: 'AccessToken token is required!',
    }),
  }),
});

const updateAccessTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const socialAuthValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    avatar: z.string(),
    password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .refine((password) => isStrongPassword(password), {
      message:
        'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.',
    }),
  }),
});

export const AuthValidation = {
  registrationActiveZodValidationSchema: userRegistrationActiveSchema,
  loginZodValidationSchema: loginValidationSchema,
  logoutZodValidationSchema: logoutValidationSchema,
  accessTokenValidationSchema: updateAccessTokenValidationSchema,
  socialAuthZodValidationSchema: socialAuthValidationSchema
};
