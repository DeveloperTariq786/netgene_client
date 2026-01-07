import { apiClient } from '@/core/api/axios/client';
import { CUSTOMER_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { AddAddressRequest, AddAddressResponse, GetAddressesResponse } from '../types';

export const AddressService = {
    addAddress: async (customerId: string, data: AddAddressRequest): Promise<AddAddressResponse> => {
        const response = await apiClient.post<AddAddressResponse>(
            `${CUSTOMER_ENDPOINTS.ADD_ADDRESS}?customer_id=${customerId}`,
            data
        );
        return response.data;
    },

    getAddresses: async (): Promise<GetAddressesResponse> => {
        const response = await apiClient.get<GetAddressesResponse>(CUSTOMER_ENDPOINTS.GET_ADDRESSES);
        return response.data;
    }
};
