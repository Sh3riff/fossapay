import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Quotes {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column('decimal', { precision: 12, scale: 2 })
  amountOfUSDT: number;

  @Column()
  destinationCountryCode: string;

  @Column('decimal', { precision: 12, scale: 2 })
  exchangeRate: number;

  @Column('decimal', { precision: 12, scale: 2 })
  basePayableAmount: number;

  @Column('decimal', { precision: 12, scale: 2 })
  transactionFee: number;

  @Column('decimal', { precision: 12, scale: 2 })
  totalPayableAmount: number;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
