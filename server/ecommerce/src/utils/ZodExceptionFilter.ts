import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { ZodError } from 'zod';
import { Response } from 'express';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ZodExceptionFilter extends BaseExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    if (!this.isZodError(exception)) {
      return super.catch(exception, host);
    }
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      type: 'validation',
      message: exception.issues[0]?.message ?? 'Unknown error',
    });
  }

  private isZodError = (err: any): err is ZodError => err.name === 'ZodError';
}
