import { AuditableEntity } from "./AuditableEntity";

export interface ReportingListeners extends AuditableEntity {
    id?: number;
    name: string;
    email: string;
    phone_number?: string;
    enable?: boolean;
    tenant_id?: number;
  }
  