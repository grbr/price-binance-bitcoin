import { Config } from '../interfaces/config.interface';
import { ProcessEnv } from '../env/process-env';

const getConfig = (): Config => ({
  PORT: process.env.PORT ? Number.parseInt(process.env.PORT) : 3000,
  UPDATE_INTERVAL_MILLIS: process.env.UPDATE_INTERVAL_MS ? Number.parseInt(process.env.UPDATE_INTERVAL_MS) : 10000,
  SERVICE_COMMISSION_PERCENT: Number.parseFloat(readEnvOrThrow('SERVICE_COMMISSION_PERCENT')),
});

export class ConfigService {
  private static readonly _config = getConfig() as Config;

  static get config(): Config {
    return this._config;
  }
}

function readEnvOrThrow(key: keyof ProcessEnv): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`missing critical environment variable ${key}`);
  }
  return value as string;
}
