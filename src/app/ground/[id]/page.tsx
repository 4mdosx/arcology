'use client'
import { useParams, useRouter } from 'next/navigation'
import '../ground.css'
import MarkBar from '@/components/mark_bar'
import BuildingModal from '@/components/building/modal'
import { create } from 'zustand'

function loadStar(id: string) {
  return {
    id,
    name: 'Star',
  }
}

function Star () {
  return (
    <div className="star">
    </div>
  )
}

function Surface() {
  return (
    <div className="surface">
    </div>
  )
}

function BuildingGrid() {
  const router = useRouter()
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const id = e.currentTarget.dataset.id
    const name = e.currentTarget.dataset.name as string
    const url = new URL(window.location.href)
    url.searchParams.set('building', name)
    router.push(url.toString())
  }
  return (
    <div className="building-grid">
      <div className='grid grid-cols-4 gap-4 gap-y-8'>
        <div className='cell' data-id="01" data-name="empty-area" onClick={handleClick}>01</div>
        <div className='cell' data-id="02" data-name="empty-area" onClick={handleClick}>02</div>
        <div className='cell' data-id="03" data-name="empty-area" onClick={handleClick}>03</div>
        <div className='cell' data-id="04" data-name="empty-area" onClick={handleClick}>04</div>
        <div className='cell' data-id="05" data-name="empty-area" onClick={handleClick}>05</div>
        <div className='cell' data-id="06" data-name="empty-area" onClick={handleClick}>06</div>
        <div className='cell' data-id="07" data-name="empty-area" onClick={handleClick}>07</div>
        <div className='cell' data-id="08" data-name="empty-area" onClick={handleClick}>08</div>
        <div className='cell' data-id="09" data-name="empty-area" onClick={handleClick}>09</div>
        <div className='cell' data-id="10" data-name="empty-area" onClick={handleClick}>10</div>
        <div className='cell' data-id="11" data-name="empty-area" onClick={handleClick}>11</div>
        <div className='cell' data-id="12" data-name="empty-area" onClick={handleClick}>12</div>
        <div className='cell' data-id="13" data-name="empty-area" onClick={handleClick}>13</div>
        <div className='cell' data-id="14" data-name="empty-area" onClick={handleClick}>14</div>
        <div className='cell' data-id="15" data-name="empty-area" onClick={handleClick}>15</div>
        <div className='cell' data-id="16" data-name="empty-area" onClick={handleClick}>16</div>
      </div>
    </div>
  )
}


const useBearStore = create((set) => ({
  grid: [],
  setGrid: (grid: any) => set({ grid }),
}))


export default function Ground() {
  const { id } = useParams()
  const star = loadStar(id as string)
  return (
    <main className="ground-page page">
      <div className="star-box" style={{ position: 'absolute', top: '60px', left: '100px' }}>
        <Star />
      </div>
      <div className="surface-box" style={{ position: 'fixed', bottom: '0', left: '0', right: '0', maxWidth: '608px', margin: '0 auto' }}>
        <Surface />
        <BuildingGrid />
      </div>
      <MarkBar />
      <BuildingModal />
    </main>
  )
}
