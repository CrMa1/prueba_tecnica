import { create } from 'zustand'

export const useStore = create((set) => ({
  banks: [],
  isLoading: true,
  setBanks: (data: any) => set((state: any) => ({
    banks: [...data]
  })),
  setLoading: (loading: any) => set((state: any) => ({
    isLoading: loading
  })),
}))