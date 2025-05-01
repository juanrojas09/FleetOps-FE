import { AuditableEntity } from "./AuditableEntity";

export interface EventsNotificationConfig extends AuditableEntity {
    id?: number;
    event_type_id?: number;
    unit_type: string;
    recurrence_value?: number;
  }
  