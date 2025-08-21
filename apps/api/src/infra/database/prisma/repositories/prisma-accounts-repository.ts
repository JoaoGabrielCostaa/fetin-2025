import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { AccountsRepository } from '@/domain/platform/application/repositories/accounts-repository'
import { PrismaAccountMapper } from '../mappers/prisma-account-mapper'
import { Account } from '@/domain/platform/enterprise/entities/account'

@Injectable()
export class PrismaAccountsRepository implements AccountsRepository {

  constructor(private prisma: PrismaService) { }

  findById(id: string): Promise<Account | null> {
    throw new Error('Method not implemented.')
  }

  delete(user: Account): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await this.prisma.account.findUnique({
      where: {
        email,
      },
    })

    if (!account) {
      return null
    }

    return PrismaAccountMapper.toDomain(account)
  }

  async create(account: Account): Promise<void> {
    const data = PrismaAccountMapper.toPrisma(account)

    await this.prisma.account.create({
      data,
    })
  }
}
