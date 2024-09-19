'use client'
import { create } from 'zustand'

export const usePointer = create((set) => ({
  x: 0,
  y: 0,
  setX: (x) => set({ x }),
  setY: (y) => set({ y }),
  set: (x, y) => set({ x, y }),
}))
