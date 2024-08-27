import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { AsyncStore } from '../als/async-store.provider';
import { RequestLogger } from './request.logger';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(AsyncStore) readonly store: AsyncStore,
    private logger: RequestLogger,
  ) {
    this.logger.setContext('REQUEST');
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl, url, ip } = req;
    const requestLog = `| ${method} | (${ip}) | ${baseUrl || url} | `;
    this.logger.log(requestLog);

    next();
  }
}
