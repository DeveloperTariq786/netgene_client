export interface CustomerLoginRequest {
    first_name: string;
    last_name: string;
    email: string;
}

export interface CustomerPermission {
    can_add_superadmin: boolean;
    can_add_admin: boolean;
    can_add_records: boolean;
    can_update_records: boolean;
    can_read_records: boolean;
    can_delete_records: boolean;
    is_customer: boolean;
    _id: string;
}

export interface CustomerUser {
    _id: string;
    email: string;
    name: string;
    role: string;
    permission: CustomerPermission[];
}

export interface CustomerLoginResponse {
    success: boolean;
    message: string;
    token: string;
    user: CustomerUser;
}
