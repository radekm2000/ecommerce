import { z } from 'zod';

export const LoginUserDtoSchema = z.object({
  username: z.string({
    required_error: 'Username is required',
  }),
  password: z.string({
    required_error: 'Password is required',
  }),
});

export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;

export const RegisterUserDtoSchema = z
  .object({
    username: z.string().min(5),
    password: z.string(),
    confirmPassword: z.string(),
    email: z.string().min(3).email('Invalid email format'),
  })
  .refine(
    (values) => {
      return values.confirmPassword === values.password;
    },
    { message: 'Passwords must match', path: ['confirmPassword'] },
  );

export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;
