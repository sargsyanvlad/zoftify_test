import { APP_FILTER } from '@nestjs/core';

import { HttpExceptionFilter } from './http.exception.filter';
import { UnknownExceptionFilter } from './unknown.exception.filter';

export const exceptionsInterceptors = Object.freeze([
  { provide: APP_FILTER, useClass: UnknownExceptionFilter },
  { provide: APP_FILTER, useClass: HttpExceptionFilter },
]);
