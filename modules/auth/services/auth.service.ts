import { apiClient } from '@/core/api/axios/client';
import { CUSTOMER_ENDPOINTS } from '@/core/api/endpoint/endpoints';
import { CustomerLoginRequest, CustomerLoginResponse } from '../types/auth.types';
import { useAuthStore } from '../store/useAuthStore';
import { AxiosRequestConfig } from 'axios';

export const AuthService = {
    login: async (data: CustomerLoginRequest): Promise<CustomerLoginResponse> => {
        // We use skipAuth: true because login typically doesn't require an existing token
        const config: AxiosRequestConfig = {
            skipAuth: true
        };


        const response = await apiClient.post<CustomerLoginResponse>(
            CUSTOMER_ENDPOINTS.LOGIN,
            data,
            config
        );

        if (response.data.success) {
            const { token, user } = response.data;
            useAuthStore.getState().setToken(token);
            useAuthStore.getState().setBackendUser(user);
        }

        return response.data;
    },

    logout: () => {
        useAuthStore.getState().logout();
    }
};
