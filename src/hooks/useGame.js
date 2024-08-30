'use client'
import { Game } from '../game/main'

export const useGame = () => {
  if (!window.game) {
    window.game = new Game()
  }
  return window.game
}
