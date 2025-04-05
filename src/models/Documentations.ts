import { AuditableEntity } from "./AuditableEntity";

export interface Documentations extends AuditableEntity {
    id?: number;
    documentation_type_id?: number;
    issue_date: string;
    expiration_date: string;
    is_expired?: boolean;
  }