import { AuditableEntity } from "./AuditableEntity";


export interface UsedSpareParts extends AuditableEntity {
    id?: number;
    intervention_id?: number;
    spare_part_id?: number;
    quantity?: number;
    total_cost?: number;
  }
  
  