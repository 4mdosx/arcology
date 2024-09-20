'use client'
import { create } from 'zustand'
import { bridgeWrapper } from '@/game/bridge'

function initDeck() {
  const deck = []
  for (let i = 0; i < 20; i++) {
    deck.push({
      id: i + 1,
      name: 'attack' + i,
      cost: 1,
      modifier: {},
    })
  }
  return deck
}

export const useBattle = create(
  bridgeWrapper(
    (set) => ({
      chess: { player: null, enemy: [] },
      marker: {
        hand_max: 5,
        draw_max: 2,
        power_max: 3,
      },
      deck: [],
      // 弃牌堆
      discard: [],
      // 手牌
      hand: [],
      // 当前回合
      round: 0,
      step: null,
      power: 0,
      result: null,
      selected: null,
      initBattle: (initData) =>
        set((state) => {
          return {
            ...state,
            chess: {
              player: {
                attack: 5,
                defense: 0,
                health: 20,
              },
              enemy: [
                {
                  name: 'enemy I',
                  attack: 5,
                  defense: 0,
                  health: 20,
                },
              ],
            },
            marker: {
              hand_max: 5,
              draw_max: 1,
              action_max: 3,
            },
            deck: initDeck(),
            discard: [],
            hand: [],
            round: 0,
            step: 'pending', // drawing, playing, fighting, settling
            selected: null,
          }
        }),
      // 对战流程
      draw: () =>
        set((state) => {
          let draw_count = state.marker.draw_max
          if (state.deck.length < draw_count) {
            // 洗牌放回
            state.deck = [...state.discard, ...state.deck]
            state.discard = []
          }
          state.hand = [...state.hand, ...state.deck.splice(0, draw_count)]
          state.deck = state.deck.slice(draw_count)

          return {
            ...state,
            step: 'drawing',
          }
        }),
      setSelected: (id) =>
        set((state) => {
          return {
            selected: id,
          }
        }),
      casting: () =>
        set((state) => {
          return {
            selected: null,
          }
        }),
    }),
    'battle'
  )
)
