import { AuditableEntity } from "./AuditableEntity";

export interface EventsTypes extends AuditableEntity {
    id?: number;
    type: string;
    is_recurrent?: boolean;
  }