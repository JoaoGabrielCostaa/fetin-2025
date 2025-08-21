import { Account } from '@/domain/platform/enterprise/entities/account'

export abstract class AccountsRepository {
  abstract findById(id: string): Promise<Account | null>
  abstract findByEmail(email: string): Promise<Account | null>
  abstract create(user: Account): Promise<void>
  abstract delete(user: Account): Promise<void>
}
