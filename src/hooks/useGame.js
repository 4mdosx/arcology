'use client'
import { Game } from '../game/main'

export const useGame = () => {
  if (typeof window === 'undefined') {
    return null
  }
  if (!window.game) {
    window.game = new Game()
  }
  return window.game
}
