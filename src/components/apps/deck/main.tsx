import AppWrapper from '../app_wrapper'
import MaterialSymbols from '@/components/material_symbols'
import Link from 'next/link'
import { useGame } from '@/hooks/useGame'
import { useToast } from '@/hooks/useToast'

export default function Deck() {
  const game = useGame()
  const hasDeckBuilding = game.data.outpost.buildings.some((building: any) => building.type === 'deck')
  const toast = useToast()
  function info () {
    toast.show('Deck Building...')
  }
  if (!hasDeckBuilding) return (
    <div onClick={info}>
  <AppWrapper >
      <MaterialSymbols raw="&#xe3a4;" style={{ fontSize: '42px' }}></MaterialSymbols>
    </AppWrapper>
    </div>
  )

  return (
    <Link href="/deck">
      <AppWrapper>
        <MaterialSymbols raw="&#xe3a5;" style={{ fontSize: '44px' }}></MaterialSymbols>
      </AppWrapper>
    </Link>
  )
}
