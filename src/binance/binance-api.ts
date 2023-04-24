import https from 'https';
import querystring from 'node:querystring';

const BINANCE_API_URL = 'api.binance.com';

export enum Endpoints {
  PRICE_SPREAD_ENDPOINT = '/api/v3/ticker/bookTicker',
}

export enum Symbols {
  BTCUSDT = 'BTCUSDT', // Bitcoin
}

export async function apiGetRequest(endpoint: Endpoints, params: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const path = `${endpoint}?${querystring.encode(params)}`;

    const options = {
      hostname: BINANCE_API_URL,
      path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = https
      .request(options, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
          data += chunk;
        });
        resp.on('end', () => {
          resolve(data);
        });
      })
      .on('error', reject)
      .end();
  });
}
