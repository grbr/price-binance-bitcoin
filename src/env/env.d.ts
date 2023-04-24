import { ProcessEnv } from './process-env';

declare global {
  namespace NodeJS {
    ProcessEnv;
  }
}

export {};
