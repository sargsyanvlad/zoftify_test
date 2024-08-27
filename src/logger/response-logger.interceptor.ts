import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { RequestLogger } from './request.logger';
import { AsyncStore } from '../als/async-store.provider';

@Injectable()
export class ResponseLoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(AsyncStore) readonly store: AsyncStore,
    private logger: RequestLogger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();

        const { method, url, ip } = request;
        const status = response.statusCode;
        const responseLog = `RESPONSE | ${method} | (${ip}) | ${url} | ${status} | `;

        this.logger.log(responseLog);
      }),
    );
  }
}
