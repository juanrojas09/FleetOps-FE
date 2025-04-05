import { AuditableEntity } from "./AuditableEntity";

export interface Documentation_notifications_config extends AuditableEntity{
    id?: number;
    documentation_type_id?: number;
    unit_type: string;
    recurrence_value?: number;
  }