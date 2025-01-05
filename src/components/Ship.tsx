import { useState } from 'react'
import { useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { create } from 'zustand'

interface ShipProps {
  type?: 'player' | 'enemy'
}

interface GridProps {
  grid: (string | null)[][]
  onDrop: (grid: (string | null)[][]) => void
}

interface GridCellProps {
  content: string | null
  onDrop: () => void
}

const GridCell: React.FC<GridCellProps> = ({ content, onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'room',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div
      ref={drop as any}
      className={`${content ? 'bg-blue-500' : 'bg-white'} ${
        isOver ? 'bg-yellow-200' : ''
      } border border-gray-300`}
      style={{
        width: '48px',
        height: '48px',
      }}
    >
      {content}
    </div>
  )
}

export const Grid: React.FC<GridProps> = ({ grid, onDrop }) => {
  return (
    <div className="grid grid-cols-16 gap-0 bg-gray-200 w-full h-full border border-gray-300">
      {grid.map((row, rowIndex) => {
        const children = row.map((cell, colIndex) => (
          <GridCell
            key={`${rowIndex}-${colIndex}`}
            content={cell}
            onDrop={() => onDrop(rowIndex, colIndex)}
          />
        ))
        return (
          <div className="flex" key={rowIndex}>
            {children}
          </div>
        )
      })}
    </div>
  )
}
type Store = {
  grid: (string | null)[][]
  setGrid: (grid: (string | null)[][]) => void
}

const useShipStore = create<Store>()((set) => ({
  grid: Array(16).fill(Array(16).fill(null)),
  setGrid: (grid: (string | null)[][]) => set({ grid }),
}))

const Ship: React.FC<ShipProps> = ({ type }: ShipProps) => {
  const { grid, setGrid } = useShipStore()

  return (
    <DndProvider backend={HTML5Backend}>
      <Grid grid={grid} onDrop={setGrid} />
    </DndProvider>
  )
}

export default Ship
