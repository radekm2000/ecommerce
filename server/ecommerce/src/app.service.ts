import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(req: Request): string {
    const { jwt } = req.cookies;
    if (!jwt) {
      return 'no cookie';
    }
    console.log(jwt);
    return 'Hello World!';
  }
}
