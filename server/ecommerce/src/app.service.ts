import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(req: Request): string {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return 'no cookie';
    }
    return `Hello world`;
  }
}
