import { create } from 'zustand';
import { CountdownItem } from '../types';

interface CountdownState {
    countdowns: CountdownItem[];
    setCountdowns: (countdowns: CountdownItem[]) => void;
}

export const useCountdownStore = create<CountdownState>((set) => ({
    countdowns: [],
    setCountdowns: (countdowns) => set({ countdowns }),
}));
