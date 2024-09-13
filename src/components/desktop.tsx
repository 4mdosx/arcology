'use client'
import { useModal } from '@/hooks/useModal'
import Stock from './apps/stock/main'

export default function Desktop() {
  const modal = useModal()
  function onClick() {
    modal.open()
  }
  return (
    <div className="desktop">
      <div style={{ left: '10px', top: '10px', position: 'relative' }}>
        <Stock />
      </div>
    </div>
  )
}
