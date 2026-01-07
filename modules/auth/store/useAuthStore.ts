import { create } from 'zustand';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/core/lib/firebase';
import { CustomerUser } from '../types/auth.types';

interface AuthStore {
    user: User | null;
    token: string | null;
    backendUser: CustomerUser | null;
    isLoading: boolean;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setBackendUser: (user: CustomerUser | null) => void;
    logout: () => void;
    initialize: () => () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null,
    backendUser: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('backend_user') || 'null') : null,
    isLoading: true,
    setUser: (user) => set({ user }),
    setToken: (token) => {
        if (token) {
            localStorage.setItem('auth_token', token);
        } else {
            localStorage.removeItem('auth_token');
        }
        set({ token });
    },
    setBackendUser: (backendUser) => {
        if (backendUser) {
            localStorage.setItem('backend_user', JSON.stringify(backendUser));
        } else {
            localStorage.removeItem('backend_user');
        }
        set({ backendUser });
    },
    logout: () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('backend_user');
        set({ user: null, token: null, backendUser: null });
    },
    initialize: () => {
        return onAuthStateChanged(auth, (user) => {
            set({ user, isLoading: false });
        });
    },
}));
