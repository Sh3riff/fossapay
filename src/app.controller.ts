import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { CreateQuoteDto } from './app.dto';
import { AdminAuthGuard } from './minimalAuth/admin-auth.guard';
import { QuotesService } from './quotes/quotes.service';
import { Throttle } from '@nestjs/throttler';

@Controller()
export class AppController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post('/api/quote')
  createQuote(@Body() body: CreateQuoteDto) {
    // Assumimg quotes are associated with users
    const userId = 'user1';
    return this.quotesService.create(
      body.destinationCountryCode,
      userId,
      body.amountOfUSDT,
    );
  }

  @Throttle({ default: { limit: 1, ttl: 60000 } }) // 5 requests per 60 seconds
  // @UseGuards(AdminAuthGuard)
  @Get('/admin/quotes')
  listQuotes() {
    return this.quotesService.find();
  }

  @UseGuards(AdminAuthGuard)
  @Get('/admin/quotes/download')
  async downloadQuotes(@Res() res: Response) {
    const csv = await this.quotesService.downloadCSV();
    res.header('Content-Type', 'text/csv');
    res.attachment('quotes.csv');
    res.send(csv);
  }
}
