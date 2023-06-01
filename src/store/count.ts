import { create } from 'zustand'

interface ICountState {
  count: number
  increment: (by?: number) => void
  decrement: (by?: number) => void
}

export const useCountStore = create<ICountState>()((set) => ({
  count: 0,
  increment: (by) => set((state) => ({ count: state.count + (by || 1) })),
  decrement: (by) => set((state) => ({ count: state.count - (by || 1) })),
}))
