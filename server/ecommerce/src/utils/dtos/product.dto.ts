import { HttpException, HttpStatus } from '@nestjs/common';
import { z } from 'zod';

export const ProductWithoutImageDtoSchema = z.object({
  title: z.string(),
  description: z.string(),
  brand: z.string(),
  category: z.string(),
  price: z.string().transform((value) => parseInt(value)),
});

export type ProductWithoutImageDto = z.infer<
  typeof ProductWithoutImageDtoSchema
>;
export const createProductFromJson = (
  content: string,
): ProductWithoutImageDto => {
  try {
    const parsedContent = JSON.parse(content);
    return ProductWithoutImageDtoSchema.parse(parsedContent);
  } catch (error) {
    throw new HttpException(
      'invalid product json data',
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
};

const Image = z.object({
  id: z.number(),
  imageName: z.string(),
  imageUrl: z.string(),
});

const User = z.object({
  id: z.number(),
  username: z.string(),
  googleId: z.string().or(z.null()),
  email: z.string(),
  role: z.enum(['user', 'admin']),
  avatar: z.string().or(z.null()),
});

export const ProductWithImageAndUserSchema = z.object({
  id: z.number(),
  brand: z.string(),
  category: z.enum(['Women', 'Men', 'Unisex']),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  images: z.array(Image),
  user: User,
});

export type ProductWithImageAndUser = z.infer<
  typeof ProductWithImageAndUserSchema
>;
