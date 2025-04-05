import { AuditableEntity } from "./AuditableEntity";

export interface RoutingData extends AuditableEntity {
    id?: number;
    origin_address: string;
    origin_lat?: number;
    origin_lng?: number;
    destination_address: string;
    dest_lat?: number;
    dest_lng?: number;
    eta?: string;
  }