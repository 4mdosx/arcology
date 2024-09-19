'use client'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useCamp = create(
  persist((set, get) => ({
    camp: null,
    stock: {
      raw_material: 0,
    },
    setCamp: (camp) => set({ camp }),
    gather: () => {
      set((state) => {
        return {
          stock: {
            raw_material: state.stock.raw_material + 1
          }
        }
      })
    }
  }), {
    name: 'camp',
    storage: createJSONStorage(() => localStorage)
  })
)
