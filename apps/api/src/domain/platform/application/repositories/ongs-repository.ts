import { Ong } from "@/domain/platform/enterprise/entities/ong";

export abstract class OngsRepository {
  abstract findById(id: string): Promise<Ong | null>
  abstract findByCnpj(cnpj: string): Promise<Ong | null>
  abstract create(ong: Ong): Promise<void>
  abstract delete(ong: Ong): Promise<void>
}
