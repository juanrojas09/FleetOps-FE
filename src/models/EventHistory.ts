import { AuditableEntity } from "./AuditableEntity";

export interface EventHistory extends AuditableEntity {
    id?: number;
    entity_id: number;
    entity_type: string;
    event_type_id?: number;
    description?: string;
    timestamp?: string;
    user_id?: number;
  }


  