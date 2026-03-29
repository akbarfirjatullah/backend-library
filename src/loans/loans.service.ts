import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoanDto } from './dto/create-loan.dto';

@Injectable()
export class LoansService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateLoanDto) {
    return this.prisma.loan.create({
      data: {
        bookId: dto.bookId,
        memberId: dto.memberId,
      },
      include: {
        book: true,
        member: true,
      },
    });
  }

  async findAll() {
    return this.prisma.loan.findMany({
      orderBy: { id: 'asc' },
      include: {
        book: true,
        member: true,
      },
    });
  }

  async findOne(id: number) {
    const loan = await this.prisma.loan.findUnique({
      where: { id },
      include: {
        book: true,
        member: true,
      },
    });
    if (!loan) throw new NotFoundException('Loan tidak ditemukan');
    return loan;
  }

  async returnBook(id: number) {
    await this.findOne(id);
    return this.prisma.loan.update({
      where: { id },
      data: {
        returned: true,
        returnDate: new Date(),
      },
      include: {
        book: true,
        member: true,
      },
    });
  }
}