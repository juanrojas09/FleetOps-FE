export interface AuditableEntity {
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: Date;
    tenant_id?: number;
}