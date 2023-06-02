import { persist } from 'zustand/middleware'

const localStorageMiddleware = persist(
  (set, get, api) => ({
    ...api,
    set: (state: any) => {
      set(state)
      localStorage.setItem('zustandState', JSON.stringify(api.getState()))
    },
  }),
  {
    name: 'zustandState',
    getStorage: () => localStorage,
  },
)

export default localStorageMiddleware
