import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export interface AccountProps {
  name: string
  email: string
  cpf: string
  password: string
}

export class Account extends Entity<AccountProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get cpf() {
    return this.props.cpf;
  }

  get password() {
    return this.props.password;
  }

  static create(props: AccountProps, id?: UniqueEntityID) {
    const user = new Account(props, id)

    return user
  }
}
