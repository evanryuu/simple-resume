import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import constant from '@/config/constant'

// offline: use local storage
// online:  use backend service api 
// example: Github Api, Gitee Api, other third api
// or custom api 
export type PersistType = 'online' | 'offline'

// only support github storage medium now
export type OnlineStorageMedium = 'github' | 'gitee' | 'other'

export type OnlineStorageContext = {
    token: string;
    owner: string;
    repo: string;
}

interface PersistState {
  persisType: PersistType
  setPersisType: (type: PersistType) => void

  onlineStorageMedium: OnlineStorageMedium,
  setOnlineStorageMedium: (medium: OnlineStorageMedium) => void,
  
  onlineStorageContext: OnlineStorageContext,
  setOnlineStorageContext: (context: OnlineStorageContext) => void,

  showStorageContextForm: boolean,
  setShowStorageContextForm: (show: boolean) => void,

 }

export const usePersistStore = create<PersistState>()(
  persist(
    (set, get) => ({
      persisType: 'offline',
      setPersisType: (val) => set(() => ({ persisType: val })),

      onlineStorageMedium: 'github',
      setOnlineStorageMedium: (val) => set(() => ({ onlineStorageMedium: val })),
      
      onlineStorageContext:  { 
        token: '',
        owner: '',
        repo: '',
      },
      setOnlineStorageContext: (val) => set(() => ({ onlineStorageContext: val })),
    
      showStorageContextForm: false,
      setShowStorageContextForm:  (val) => set(() => ({ showStorageContextForm: val })),
    }),
    {
      name: constant.PERSIST_SETTING,
    },
  ),
)
