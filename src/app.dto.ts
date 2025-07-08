/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsPositive, IsIn } from 'class-validator';

export class CreateQuoteDto {
  @IsInt()
  @IsPositive()
  amountOfUSDT: number;

  @IsIn(['NGN', 'ZAR'])
  destinationCountryCode: string;
}
