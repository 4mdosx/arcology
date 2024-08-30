import { create } from 'zustand'

export const useModal = create((set) => ({
  visible: false,
  payload: null,
  open: (payload) => set({ visible: true, payload }),
  close: () => set({ visible: false, payload: null }),
}))
