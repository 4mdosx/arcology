'use client'
import AppWrapper from '../app_wrapper'
import MaterialSymbols from '@/components/material_symbols'
import Link from 'next/link'
import { useGame } from '@/hooks/useGame'
interface AppProps {
  style?: React.CSSProperties
}

export default function Stock({ style }: AppProps) {
  const game = useGame()
  const hasStockBuilding = game.data.outpost.buildings.some((building: any) => building.type === 'stock')

  const stock = game.data.outpost.stock
  if (!hasStockBuilding) return (
    <AppWrapper>
      <MaterialSymbols raw="&#xf8ee;"></MaterialSymbols>
      <div className='title text-sm'>原材料</div>
      <div className='badge'>{ stock.raw_material }</div>
    </AppWrapper>
  )
  return (
    <Link href="/stock" style={style}>
      <AppWrapper>
        <MaterialSymbols raw="&#xea12;"></MaterialSymbols>
        <div className='title'>Stock</div>
      </AppWrapper>
    </Link>
  )
}
