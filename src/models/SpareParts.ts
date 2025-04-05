import { AuditableEntity } from "./AuditableEntity";

export interface SpareParts extends AuditableEntity {
    id?: number;
    name: string;
    description?: string;
    unit_price?: number;
    supplier_id?: number;
  }
  