import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateQuoteDto } from './app.dto';
import { AdminAuthGuard } from './minimalAuth/admin-auth.guard';
import {
  QuoteResponseDto,
  PaginatedQuoteResponseDto,
} from './quotes/quotes.dto';
import { QuotesService } from './quotes/quotes.service';

@Controller()
export class AppController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post('/api/quote')
  @ApiOperation({ summary: 'Create Quote' })
  @ApiResponse({
    status: 201,
    description: 'Quote created',
    type: QuoteResponseDto,
  })
  createQuote(@Body() body: CreateQuoteDto) {
    // Assumimg quotes are associated with users
    const userId = 'user1';
    return this.quotesService.create(
      body.destinationCountryCode,
      userId,
      body.amountOfUSDT,
    );
  }

  @UseGuards(AdminAuthGuard)
  @Get('/admin/quotes')
  @ApiResponse({
    status: 200,
    description: 'List of quotes with pagination',
    type: PaginatedQuoteResponseDto,
  })
  @ApiOperation({ summary: 'Admin List Quote' })
  listQuotes() {
    return this.quotesService.find();
  }

  @UseGuards(AdminAuthGuard)
  @Get('/admin/quotes/download')
  @ApiOperation({ summary: 'Admin Download Quotes as .csv file' })
  async downloadQuotes(@Res() res: Response) {
    const csv = await this.quotesService.downloadCSV();
    res.header('Content-Type', 'text/csv');
    res.attachment('quotes.csv');
    res.send(csv);
  }
}
