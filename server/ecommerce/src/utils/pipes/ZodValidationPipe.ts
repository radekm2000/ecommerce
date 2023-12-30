import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  public constructor(private readonly schema: ZodSchema) {}

  public transform = (value: any, metadata: ArgumentMetadata) => {
    if (metadata.type === 'body') {
      return this.schema.parse(value);
    }
    return value;
  };
}
