import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parser } from '@json2csv/plainjs';
import { Repository } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { ExchangeRateService } from '../exchange-rate/exchange-rate.service';
import { Quotes } from './quotes.entity';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quotes)
    private quoteRepository: Repository<Quotes>,
    private readonly exchangeRateService: ExchangeRateService,
  ) {}

  private getCountryFeePercentage(currencyCode: string): number {
    const fee = {
      NGN: 4,
      ZAR: 5,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return fee[currencyCode] || 10;
  }

  async create(currencyCode: string, userId: string, amountOfUSDT: number) {
    const exchangeRate = this.exchangeRateService.getExchangeRate(currencyCode);
    const percentageFee = this.getCountryFeePercentage(currencyCode);

    // Ensure 2 Decimal place accuracy
    const basePayableAmount =
      Math.ceil(exchangeRate * amountOfUSDT * 100) / 100;
    const transactionFee =
      Math.ceil(exchangeRate * amountOfUSDT * percentageFee) / 100;
    const totalPayableAmount = basePayableAmount + transactionFee;

    const newQuote = this.quoteRepository.create({
      id: uuidv7(),
      userId,
      exchangeRate,
      amountOfUSDT,
      basePayableAmount,
      transactionFee,
      destinationCountryCode: currencyCode,
      status: 'pending',
      totalPayableAmount,
    });

    try {
      await this.quoteRepository.save(newQuote);
      return newQuote;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  // async findById(quoteId: string): Promise<Quotes | null> {
  //   return this.quoteRepository.findOne({ where: { id: quoteId } });
  // }

  async find(limit = 50, offset = 0) {
    try {
      const [data, total] = await this.quoteRepository.findAndCount({
        order: { createdAt: 'DESC' },
        skip: offset,
        take: limit,
      });
      return {
        data,
        meta: {
          total,
          limit,
          offset,
          currentPage: Math.floor(offset / limit) + 1,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }

  async downloadCSV(limit = 50, offset = 0) {
    try {
      const quotes = await this.find(limit, offset);
      const parser = new Parser();
      return parser.parse(quotes.data);
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    }
  }
}
