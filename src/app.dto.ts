/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsIn } from 'class-validator';

export class CreateQuoteDto {
  @IsInt()
  @IsPositive()
  @ApiProperty()
  amountOfUSDT: number;

  @IsIn(['NGN', 'ZAR'])
  @ApiProperty()
  destinationCountryCode: string;
}
