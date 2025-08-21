import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

interface OngProps {
  name: string
  cnpj: string
  description: string
  mission: string
  cep: string
  image: string
  banner: string
  foundationDate: Date
  website: string
  contactNumber: string
  contactEmail: string
}

export class Ong extends Entity<OngProps> {
  get name() {
    return this.props.name;
  }

  get cnpj() {
    return this.props.cnpj;
  }

  get description() {
    return this.props.description;
  }

  get mission() {
    return this.props.mission;
  }

  get cep() {
    return this.props.cep;
  }

  get image() {
    return this.props.image;
  }

  get banner() {
    return this.props.banner;
  }

  get foundationDate() {
    return this.props.foundationDate;
  }

  get website() {
    return this.props.website;
  }

  get contactNumber() {
    return this.props.contactNumber;
  }

  get contactEmail() {
    return this.props.contactEmail;
  }

  static create(props: OngProps, id?: UniqueEntityID) {
    const user = new Ong(props, id)

    return user
  }
}
