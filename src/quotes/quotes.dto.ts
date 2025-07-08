import { ApiProperty } from '@nestjs/swagger';

export class QuoteResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() userId: string;
  @ApiProperty() exchangeRate: number;
  @ApiProperty() amountOfUSDT: number;
  @ApiProperty() basePayableAmount: number;
  @ApiProperty() transactionFee: number;
  @ApiProperty() destinationCountryCode: string;
  @ApiProperty() status: string;
  @ApiProperty() totalPayableAmount: number;
}

class MetaDto {
  @ApiProperty() total: number;
  @ApiProperty() limit: number;
  @ApiProperty() offset: number;
  @ApiProperty() currentPage: number;
  @ApiProperty() totalPages: number;
}

export class PaginatedQuoteResponseDto {
  @ApiProperty({ type: [QuoteResponseDto] })
  data: QuoteResponseDto[];

  @ApiProperty({ type: MetaDto })
  meta: MetaDto;
}
