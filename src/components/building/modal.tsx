'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { X } from 'lucide-react'
import { AnimatePresence } from 'motion/react'
import * as motion from 'motion/react-client'
import './building.css'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

function EmptyArea() {
  const buildings = [
    {
      id: 1,
      name: '猫薄荷田',
    },
    {
      id: 2,
      name: '风力发电站',
    },
    {
      id: 3,
      name: '水力发电',
    },
  ]
  return (
    <div className="empty-area flex gap-2 flex-col">
      {buildings.map((building) => (
        <div key={building.id} className="building-card flex justify-between">
          <div className="building-card_info flex justify-evenly h-full flex-col">
            <div className="building-card_name">{building.name}</div>
            <div className="building-card_price">
              <span>价格：</span>
              <span>100</span>
            </div>
          </div>
          <div className='building-card_buy-btn'>
            <Button variant="outline" className='h-full'>部署</Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function BuildingModal() {
  const params = useSearchParams()
  const building = params.get('building')
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  function handleClose() {
    setIsOpen(false)
    router.back()
  }

  useEffect(() => {
    if (building) setIsOpen(true)
  }, [building, setIsOpen])


  const view = (() => {
    switch (building) {
      case 'empty-area':
        return <EmptyArea />
      case 'area':
        return <div>area</div>
      default:
        return null
    }
  })()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="building-modal-mask" onClick={handleClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
          <motion.section
            className="building-modal"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '10%', opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) =>
              e.stopPropagation()
            }
          >
            <div className="building-modal_header">
              <X onClick={handleClose} />
            </div>
            <div className="building-modal_content">{view}</div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
