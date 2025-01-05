import { create } from 'zustand'

type Frame = {
  type: string
  id: string
}
type Room = {
  type: string
  id: string
}
type Cell = {
  type: string
  position: {
    x: number
    y: number
  }
}
type PlayerShipStore = {
  grid: Cell[][]
  offset: { x: number, y: number }
  init: (playerShip: PlayerShip) => void
  setFrame: (frame: Frame) => void
  removeFrame: (frame: Frame) => void
  setRoom: (room: Room) => void
  removeRoom: (room: Room) => void
}
type PlayerShip = {
  frames: Frame[]
  rooms: Room[]
}

function createGrid(playerShip: PlayerShip): Cell[][] {
  const grid: Cell[][] = new Array(24).fill(new Array(24).fill({ type: 'empty', position: { x: 0, y: 0 } }))
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      cell.position = { x: cellIndex, y: rowIndex }
    })
  })
  return grid
}

function resetOffset() {
  let defaultPoint = 24 * 64 / 2
  let startX = defaultPoint
  let startY = defaultPoint
  return { x: startX, y: startY }
}
export const usePlayerShipStore = create<PlayerShipStore>()((set) => ({
  grid: [[]],
  offset: { x: 0, y: 0 },
  init: (playerShip: PlayerShip) => set({ grid: createGrid(playerShip), offset: resetOffset() }),
  setFrame: (frame: Frame) => {},
  removeFrame: (frame: Frame) => {},
  setRoom: (room: Room) => {},
  removeRoom: (room: Room) => {},
}))

