import { Either, left, right } from '@/core/either'
import { Injectable } from '@nestjs/common'

import { HashComparer } from '@/domain/platform/application/cryptography/hash-comparer'
import { Encrypter } from '@/domain/platform/application/cryptography/encrypter'
import { AccountsRepository } from '@/domain/platform/application/repositories/accounts-repository'

import { WrongCredentialsError } from './errors/wrong-credentials-error'

interface AuthenticateStudentUseCaseRequest {
  email: string
  password: string
}

type AuthenticateStudentUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

@Injectable()
export class AuthenticateAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
  ) { }

  async execute({
    email,
    password,
  }: AuthenticateStudentUseCaseRequest): Promise<AuthenticateStudentUseCaseResponse> {
    const account = await this.accountsRepository.findByEmail(email)

    if (!account) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      account.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: account.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
