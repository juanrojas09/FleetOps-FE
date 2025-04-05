import { AuditableEntity } from "./AuditableEntity";

export interface Interventions extends AuditableEntity  {
    id?: number;
    entity_id: number;
    entity_type_id?: number;
    event_type_id?: number;
    description?: string;
    labor_cost?: number;
    total_cost?: number;
    estimated_finish_date?: string;
    intervention_status_id?: number;
    responsible_person_id?: number;
    tenant_id?: number;
  }
  