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
