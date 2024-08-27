import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  Inject,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { AsyncStore } from '../als/async-store.provider';

/**
 * Base Class for every filter here
 */
export class TransformExceptionFilter<T extends Error>
  implements ExceptionFilter<T>
{
  protected readonly logger = new Logger(TransformExceptionFilter.name);
  private readonly logColorRegExp =
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;
  constructor(@Inject(AsyncStore) private readonly store: AsyncStore) {}

  transform(exception: T, host: ArgumentsHost): HttpException {
    return new InternalServerErrorException();
  }

  catch(exception: T, host: ArgumentsHost) {
    if (this.store.request) {
      const { url, body, headers, cookies, method } = this.store.request;
      let { authorization } = headers;
      if (authorization) {
        authorization = authorization.split(' ')[0] + ' *****';
      }

      const request = JSON.stringify(
        {
          id: this.store.requestUUID,
          url,
          cookies,
          body,
          headers: {
            ...headers,
            authorization,
          },
        },
        null,
        '  ',
      );

      this.logger.verbose(`Exception on request: ${request}`);
    }

    this.logger.verbose(exception.stack || exception);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { cause } = exception;
    if (cause) {
      this.logger.verbose(`Caused by`);
      this.logger.verbose((cause as any).stack || cause);
    }

    const transformedException = this.transform(exception, host);
    const response = {
      /* should confront to ErrorResponseDto */
      statusCode: transformedException.getStatus(),
      requestId: this.store.requestUUID || 'unknown',
      message: transformedException.message,
    };

    const transformedResponse = transformedException.getResponse();
    if (typeof transformedResponse === 'object') {
      Object.assign(response, transformedResponse);
    }

    this.logger.verbose(`Response: ${JSON.stringify(response, null, `  `)}`);

    host
      .switchToHttp()
      .getResponse<Response>()
      .status(transformedException.getStatus())
      .json(response);
  }
}
