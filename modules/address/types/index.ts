export interface AddAddressRequest {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postal_code: string;
}

export interface AddAddressResponse {
    success: boolean;
    message: string;
}

export interface Address {
    _id: string;
    customer_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    country: string;
    state: string;
    city: string;
    postal_code: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface GetAddressesResponse {
    success: boolean;
    message: string;
    data: Address[];
}
