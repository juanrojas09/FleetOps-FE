import { AuditableEntity } from "./AuditableEntity";

export interface FuelLoads extends AuditableEntity {
    id?: number;
    entity_id: number;
    entity_type_id: number;
    charge_date: string;
    loaded_liters?: number;
    load_total_cost?: number;
    fuel_type_id?: number;
    unit_type_use_id?: number;
    tenant_id?: number;
    entity_kilometers_on_load?: number;
  }