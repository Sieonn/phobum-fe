import { create } from 'zustand';

export interface User {
  id: number;
  nickname: string;
  email?: string;
  provider?: string;
}

interface Store {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
})); 