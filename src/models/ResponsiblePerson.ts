import { AuditableEntity } from "./AuditableEntity";

export interface Responsible_people extends AuditableEntity {
    id?: number;
    name: string;
    surname: string;
    document_number: string;
    email?: string;
    phone_number?: string;
    type_of_person_id?: number;
    documentation_id?: number;
    tenant_id?: number;
  }
  