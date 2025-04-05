import { AuditableEntity } from "./AuditableEntity";

export interface DocumentationNotificationThresholds extends AuditableEntity{
    id?: number;
    config_id?: number;
    threshold_value?: number;
    description?: string;
    order_index?: number;
  }
  