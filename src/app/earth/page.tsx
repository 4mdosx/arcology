'use client'

import MarkBar from '@/components/mark_bar'
import { useSearchParams } from 'next/navigation'
import OpenLayersMap from '@/components/map/main'
import { useWorldMap } from '@/components/map/useWorldMap'
export default function Earth() {
  const worldMap = useWorldMap()
  return (
    <div className='w-full h-full'>
      <OpenLayersMap />
      <MarkBar />
      <div className='absolute top-0 left-0'>
        <button onClick={() => {
          worldMap.loadModels()
        }}>Load Models</button>
      </div>
    </div>
  )
}
