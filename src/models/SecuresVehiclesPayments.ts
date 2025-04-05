import { AuditableEntity } from "./AuditableEntity";

export interface SecuresVehiclesPayments extends AuditableEntity {
    id?: number;
    secure_cost?: number;
    vehicle_id?: number;
  }