import { AsyncLocalStorage } from 'async_hooks';
import { randomUUID } from 'crypto';
import { Request } from 'express';

export class Store {
  constructor(
    readonly request: Request,
    readonly requestUUID: string = randomUUID(),
    readonly logs: string[] = [],
  ) {}
}

export const asyncLocalStorage = new AsyncLocalStorage<Store>();
