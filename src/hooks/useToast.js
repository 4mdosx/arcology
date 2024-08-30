import { create } from 'zustand'

export const useToast = create((set) => ({
  visible: false,
  payload: null,
  show: (payload) => set({ visible: true, payload }),
  close: () => set({ visible: false, payload: null }),
}))
