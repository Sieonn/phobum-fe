import { create } from 'zustand';

interface User {
  id: string;
  nickname: string;
  profileImage: string;
}

interface Store {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
})); 