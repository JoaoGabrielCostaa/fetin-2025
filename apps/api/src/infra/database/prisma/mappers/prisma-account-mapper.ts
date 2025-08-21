import { Account as PrismaUser, Prisma } from '@prisma/client'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Account } from '@/domain/platform/enterprise/entities/account'

export class PrismaAccountMapper {
  static toDomain(raw: PrismaUser): Account {
    return Account.create(
      {
        name: raw.name,
        email: raw.email,
        cpf: raw.cpf,
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(account: Account): Prisma.AccountUncheckedCreateInput {
    return {
      id: account.id.toString(),
      name: account.name,
      email: account.email,
      cpf: account.cpf,
      password: account.password,
    }
  }
}
