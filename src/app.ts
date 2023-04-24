import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { PriceSpreadDto } from './dto/price-spread.dto';
import { PriceService } from './services/price.service';

const app: Express = express();

app.use(helmet());
app.use(cors());
app.options('*', cors());

app.get('/', async (req: Request, res: Response) => {
  const priceSpread = await PriceService.cachedBinanceBitcoinPriceSpread();
  if (priceSpread == null) {
    res.status(503).send('Service temporarily unavailable');
  } else {
    PriceService.cache.binanceBitcoinPriceSpread;
    const response: PriceSpreadDto = {
      ask: priceSpread.ask.toFixed(8),
      bid: priceSpread.bid.toFixed(8),
      mid: priceSpread.mid.toFixed(8),
    };
    res.send(response);
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).send('Not found.');
});

export default app;
