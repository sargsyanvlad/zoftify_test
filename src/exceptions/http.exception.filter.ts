import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

import { TransformExceptionFilter } from './transform.exception.filter';

@Catch(HttpException)
export class HttpExceptionFilter extends TransformExceptionFilter<HttpException> {
  transform(exception: HttpException, host: ArgumentsHost): HttpException {
    return exception;
  }
}
