'use client'
import DesktopApp from './app'
import { useModal } from '@/hooks/useModal'

export default function Desktop() {
  const modal = useModal()
  function onClick() {
    modal.open()
  }
  return (
    <div className="desktop">
      <DesktopApp name="find" style={{ left: '10px', top: '20px' }} href="/find" />
    </div>
  )
}
