import { Logger, Module } from '@nestjs/common';
import { RequestLogger } from './request.logger';

@Module({
  providers: [RequestLogger],
  exports: [RequestLogger],
})
export class LoggerModule {
  private readonly logger: Logger = new Logger(LoggerModule.name);

  onApplicationBootstrap() {
    const isUsingLogger = this.logger.localInstance instanceof RequestLogger;
    if (!isUsingLogger) {
      this.logger.warn(
        `RequestUUIDLoader is not installed, call 'app.useLogger(app.get(RequestUUIDLogger))' `,
      );
    }
  }
}
