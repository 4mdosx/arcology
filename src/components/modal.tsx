'use client'
import { useModal } from '@/hooks/useModal'
import { useEffect } from 'react'
import AppIcon from './app_icon'

function ActionHeader() {
  return (
    <div className="modal-header action-with-widget">
      <AppIcon name="article" />
      <div className="title">
        <h2>一张交接清单</h2>
        <div className="usage">
          <AppIcon name="health" mini={true} />
          <span className="number">1</span>
          <AppIcon name="time" mini={true} />
          <span className="number">5s</span>
        </div>
      </div>
    </div>
  )
}

function LootHeader() {
  return (
    <div className="modal-header loot">
      <AppIcon name="article" />
      <AppIcon name="article" />
      <AppIcon name="article" />
    </div>
  )
}

function ActionFooter() {
  return (
    <div className="modal-footer">
      <div className='action-button'>开始验收</div>
    </div>
  )
}
export default function Modal() {
  const { visible, close } = useModal()

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [visible])

  if (!visible) return null

  return (
    <div id="modal" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <ActionHeader />
        <LootHeader />
        <div className="modal-body">
          <p>地址：居住区 443 23:44 E-1704</p>
          <p>请携带该文件及有效身份证件办理登记入住...</p>
        </div>
        <ActionFooter />
      </div>
    </div>
  )
}
