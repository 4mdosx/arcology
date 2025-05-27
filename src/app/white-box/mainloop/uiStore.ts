import { create } from 'zustand'

interface UIState {
  fps: number
  loginCount: number
  setFPS: (fps: number) => void
  setLoginCount: (count: number) => void
}

export const useUIStore = create<UIState>((set) => ({
  fps: 0,
  loginCount: 0,
  setLoginCount: (count) => set({ loginCount: count }),
  setFPS: (fps) => set({ fps }),
}))
