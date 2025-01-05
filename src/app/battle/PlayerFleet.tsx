import React, { useEffect } from 'react'
import PlayerShip from '@/components/PlayerShip'
import { usePlayerShipStore } from '@/hooks/usePlayerShip'

function getPlayerShip() {
  return {
    frames: [],
    rooms: [],
  }
}

export default function PlayerFleet() {
  const ship = getPlayerShip()
  const { init } = usePlayerShipStore()
  useEffect(() => {
    init(ship)
  }, [])
  return (
    <div className="fleet-container">
      <PlayerShip />
    </div>
  )
}
