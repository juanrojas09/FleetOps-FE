import { AuditableEntity } from "./AuditableEntity";

export interface Vehicles extends AuditableEntity {
    id?: number;
    patent: string;
    model_id?: number;
    fuel_id?: number;
    service_id?: number;
    kilometers?: number;
    vehicle_status_id?: number;
    tenant_id?: number;
    entity_type_id?: number;
  }
  