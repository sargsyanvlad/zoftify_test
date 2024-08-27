import { Injectable } from '@nestjs/common';
import { asyncLocalStorage } from './storage';
import { Request } from 'express';

@Injectable()
export class AsyncStore {
  get request(): Request | undefined {
    return asyncLocalStorage.getStore()?.request;
  }

  get requestUUID(): string | undefined {
    return asyncLocalStorage.getStore()?.requestUUID;
  }

  get logs(): string[] | undefined {
    return asyncLocalStorage.getStore()?.logs;
  }

  addLog(log: string) {
    asyncLocalStorage.getStore()?.logs.push(log);
  }
}
