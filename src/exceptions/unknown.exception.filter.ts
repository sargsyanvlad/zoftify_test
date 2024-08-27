import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

import { TransformExceptionFilter } from './transform.exception.filter';

type AnonymousError = Error & {
  code?: number;
  status?: number;
};

@Catch()
export class UnknownExceptionFilter extends TransformExceptionFilter<any> {
  transform(exception: AnonymousError, host: ArgumentsHost): HttpException {
    return new InternalServerErrorException({
      code: exception.code || 0,
      message: exception.message || "I'm a teapot",
      isInformative: false,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
