'use client'

import MarkBar from '@/components/mark_bar'
import { useSearchParams } from 'next/navigation'
import OpenLayersMap from '@/components/map/main'

export default function Earth() {
  const searchParams = useSearchParams()
  const map = searchParams.get('map') || '8/31.21977/121.50100'
  const [zoom, lat, lon] = map.split('/').map(Number)

  return (
    <div className='w-full h-full'>
      <OpenLayersMap center={[lon, lat]} zoom={zoom} />
      <MarkBar />
    </div>
  )
}
