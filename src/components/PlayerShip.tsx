import { usePlayerShipStore } from '@/hooks/usePlayerShip'
import DraggableContainer from './DraggableContainer'

function MainView () {
  const { grid } = usePlayerShipStore()
  return <div className=" bg-red-500" style={{ width: 1536, height: 1536 }}> PlayerShip </div>
}

export default function PlayerShip() {
  return (
    <DraggableContainer
        width={430}
        height={430}
      >
        <MainView />
      </DraggableContainer>
  )
}
