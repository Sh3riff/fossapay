import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cron, CronExpression } from '@nestjs/schedule';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExchangeRateService {
  private readonly logger = new Logger(ExchangeRateService.name);
  private exchangeRates: Record<string, number> = {
    NGN: 0.0,
    ZAR: 0.0,
  };

  constructor(private readonly httpService: HttpService) {
    this.fetchCoinGeckoRates(); // Initial fetch on service startup
  }

  @Cron(CronExpression.EVERY_6_HOURS)
  private async fetchCoinGeckoRates() {
    const usdtId = 'tether',
      ngnCode = 'ngn',
      zarCode = 'zar';
    const fiatCurrencies = `${ngnCode},${zarCode}`;
    const requestUrl = `${process.env.GECKO_RATE_URL}?ids=${usdtId}&vs_currencies=${fiatCurrencies}`;
    try {
      const response = await firstValueFrom(
        this.httpService.get(requestUrl, {
          headers: { 'x-cg-demo-api-key': process.env.GECKO_API_KEY },
        }),
      );

      this.exchangeRates['NGN'] = response.data.tether.ngn;
      this.exchangeRates['ZAR'] = response.data.tether.zar;

      this.logger.log('Exchange rates updated.', response.data);
    } catch (error) {
      this.logger.error('Failed to fetch exchange rates', error);
    }
  }

  getExchangeRate(currencyCode: string): number | undefined {
    return this.exchangeRates[currencyCode];
  }
}
