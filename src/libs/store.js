import {create} from 'zustand';

export const userStore = create((set) => ({
  user: null,
  login: (data) => set({user:data}),
  logout: () => set((state) => ({ user: null })),
}));