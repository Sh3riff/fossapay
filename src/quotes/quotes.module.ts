import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ExchangeRateModule } from '../exchange-rate/exchange-rate.module';
import { QuotesService } from './quotes.service';
import { Quotes } from './quotes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quotes]), ExchangeRateModule],
  providers: [QuotesService],
  exports: [QuotesService],
})
export class QuotesModule {}
