import { ConsoleLogger, Inject, LogLevel } from '@nestjs/common';
import { AsyncStore } from '../als/async-store.provider';

const logLevels: LogLevel[] = ['log', 'error', 'warn', 'verbose', 'debug'];

export class RequestLogger extends ConsoleLogger {
  constructor(@Inject(AsyncStore) readonly store: AsyncStore) {
    super(``, {
      logLevels,
    });
  }

  /* override */
  formatPid(pid: string | number) {
    const uuid =
      this.store.requestUUID || `00000000-0000-0000-0000-000000000000`;
    return `${uuid}   (${pid})   `;
  }

  /* override */
  stringifyMessage(message: any, logLevel: any) {
    return super.stringifyMessage(message, logLevel);
  }
}
