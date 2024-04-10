import { Injectable, PipeTransform } from '@nestjs/common';
import {
  ProductWithoutImageDto,
  ProductWithoutImageDtoSchema,
} from '../dtos/product.dto';

@Injectable()
export class ParseAndValidateProductPipe implements PipeTransform {
  transform(value: any): ProductWithoutImageDto {
    const parsedContent = JSON.parse(value.data);

    return ProductWithoutImageDtoSchema.parse(parsedContent);
  }
}
