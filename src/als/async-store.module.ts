import {
  Global,
  MiddlewareConsumer,
  Module,
  NestMiddleware,
} from '@nestjs/common';
import * as express from 'express';
import { asyncLocalStorage, Store } from './storage';
import { AsyncStore } from './async-store.provider';

/* this should be installed with app.use in order for the whole module to work */
export function asyncStoreMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const store = new Store(req);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore next can be called without arguments
  asyncLocalStorage.run(store, next);
}

class InstallationChecker implements NestMiddleware {
  use(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (!asyncLocalStorage.getStore()) {
      throw new Error(`asyncStoreMiddleware was not installed properly`);
    }

    next();
  }
}

@Global()
@Module({
  providers: [AsyncStore],
  exports: [AsyncStore],
})
export class AsyncStoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(InstallationChecker).forRoutes('*');
  }
}
