import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Account, AccountProps } from '@/domain/platform/enterprise/entities/account'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { PrismaAccountMapper } from '@/infra/database/prisma/mappers/prisma-account-mapper'
import generateCPF from 'test/utils/generate-cpf'

export function makeStudent(
  override: Partial<AccountProps> = {},
  id?: UniqueEntityID,
) {
  const student = Account.create(
    {
      name: faker.person.fullName(),
      cpf: generateCPF(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}

@Injectable()
export class AccountFactory {
  constructor(private prisma: PrismaService) { }

  async makePrismaUserAccount(data: Partial<AccountProps> = {}): Promise<Account> {
    const student = makeStudent(data)

    await this.prisma.account.create({
      data: PrismaAccountMapper.toPrisma(student),
    })

    return student
  }
}
