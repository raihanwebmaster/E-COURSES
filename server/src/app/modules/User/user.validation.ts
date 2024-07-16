import { z } from 'zod';

export const isStrongPassword = (password: string): boolean => {
  // Customize this function based on your password requirements
  // For example, you can enforce a minimum length, uppercase, lowercase, digits, and special characters
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return strongPasswordRegex.test(password);
};

const userCreateSchema = z.object({
  body: z
    .object({
      name: z.string().min(1),
      email: z.string().email(),
      password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .refine((password) => isStrongPassword(password), {
          message:
            'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.',
        }),
      needsPasswordChange: z.boolean().optional(),
      avatar: z
        .object({
          public_id: z.string(),
          url: z.string(),
        })
        .optional(),
      role: z.enum(['user', 'admin']).optional(),
      status: z.enum(['in-progress', 'blocked']).optional(),
      isVerified: z.boolean().optional(),
      courses: z.array(z.object({ courseId: z.string() })).optional(),
    })
    .strict(),
});

const getMeValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
    accessToken: z.string({
      required_error: 'AccessToken token is required!',
    }),
  }),
});

const userUpdateValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
    accessToken: z.string({
      required_error: 'AccessToken token is required!',
    }),
  }),
  body: z
    .object({
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
      avatar: z
        .object({
          public_id: z.string(),
          url: z.string(),
        })
        .optional(),
    })
    .strict(),
});

const userAvatarUpdateValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
    accessToken: z.string({
      required_error: 'AccessToken token is required!',
    }),
  }),
  body: z
    .object({
      avatar: z.string(),
    })
    .strict(),
});

const userRoleUpdateZodValidationSchema = z.object({
  body: z.object({
    email: z.string().email(),
    role: z.enum(['user', 'admin']),
  }),

});

export const UserValidation = {
  userZodValidationSchema: userCreateSchema,
  getMeZodValidationSchema: getMeValidationSchema,
  userUpdateZodValidationSchema: userUpdateValidationSchema,
  userAvatarUpdateZodValidationSchema: userAvatarUpdateValidationSchema,
  userRoleUpdateZodValidationSchema: userRoleUpdateZodValidationSchema,
};
