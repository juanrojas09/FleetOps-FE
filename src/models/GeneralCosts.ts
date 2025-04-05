import { AuditableEntity } from "./AuditableEntity";

export interface GeneralCosts extends AuditableEntity{
    id?: number;
    brand_id?: number;
    concept?: string;
    value?: number;
  }