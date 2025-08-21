import { DomainEvents } from '@/core/events/domain-events'
import { AccountsRepository } from '@/domain/platform/application/repositories/accounts-repository'
import { Account } from '@/domain/platform/enterprise/entities/account'

export class InMemoryAccountsRepository implements AccountsRepository {

  public items: Account[] = []

  async findById(id: string): Promise<Account | null> {
    const account = this.items.find((item) => item.id.toString() === id)
    return account ?? null
  }

  async delete(user: Account): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(user.id))
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }

  async findByEmail(email: string) {
    const account = this.items.find((item) => item.email === email)

    if (!account) {
      return null
    }

    return account
  }

  async create(account: Account) {
    this.items.push(account)

    DomainEvents.dispatchEventsForAggregate(account.id)
  }
}
