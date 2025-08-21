import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';

import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';

import { RegisterAccountUseCase } from '@/domain/platform/application/use-cases/register-account';
import { AuthenticateAccountUseCase } from '@/domain/platform/application/use-cases/authenticate-account';


@Module({
  imports: [CryptographyModule, DatabaseModule],
  controllers: [CreateAccountController,
    AuthenticateController
  ],
  providers: [RegisterAccountUseCase, AuthenticateAccountUseCase],
})
export class HttpModule { }
