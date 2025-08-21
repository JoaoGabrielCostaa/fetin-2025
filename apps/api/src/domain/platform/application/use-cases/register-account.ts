import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

import { AccountsRepository } from '../repositories/accounts-repository'
import { HashGenerator } from '@/domain/platform/application/cryptography/hash-generator'
import { AccountAlreadyExistsError } from './errors/account-already-exists-error'
import { Account } from '../../enterprise/entities/account'

interface RegisterAccountUseCaseRequest {
  name: string
  email: string
  cpf: string
  password: string
}

type RegisterAccountUseCaseResponse = Either<
  AccountAlreadyExistsError,
  {
    account: Account
  }
>

@Injectable()
export class RegisterAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private hashGenerator: HashGenerator,
  ) { }

  async execute({
    name,
    email,
    cpf,
    password,
  }: RegisterAccountUseCaseRequest): Promise<RegisterAccountUseCaseResponse> {
    const studentWithSameEmail =
      await this.accountsRepository.findByEmail(email)

    if (studentWithSameEmail) {
      return left(new AccountAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const account = Account.create({
      name,
      email,
      cpf,
      password: hashedPassword,
    })

    await this.accountsRepository.create(account)

    return right({
      account,
    })
  }
}
