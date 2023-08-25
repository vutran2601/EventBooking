import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class EmailValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');

    if (emailRegex.test(req.body.email)) {
      next();
    } else {
      res.writeHead(400, { 'content-type': 'application/json' });
      res.write(JSON.stringify({ message: 'Bad request: Invalid Email' }));
      res.end();
      return;
    }
  }
}
