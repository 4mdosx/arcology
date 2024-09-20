'use client'
import { useEffect, useRef, useCallback, useMemo } from 'react'
import { useBattle } from '@/hooks/useBattle'
import { usePointer } from '@/hooks/usePointer'
import Scene from '@/components/scene'
import { Bezier } from 'bezier-js'
import clsx from 'clsx'
import './battle.css'

function Card({ card, style }: { card: any, style?: any }) {
  return (
    <div className='card' style={style}>
      <p>{card.name}</p>
    </div>
  )
}

function CardInHand({ card, pointX, pointY, rotate }: { card: any, pointX: number, pointY: number, rotate: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { setSelected, selected } = useBattle()
  const { set } = usePointer()
  const select = useCallback((e: any) => {
    setSelected(card.id)
    if (e.type === 'mousedown') {
      set(e.clientX, e.clientY)
    } else {
      set(e.touches[0].clientX, e.touches[0].clientY)
    }
  }, [card.id, setSelected, set])
  const isDragging = useMemo(() => {
    return selected === card.id
  }, [selected, card.id])
  return (
    <div
      ref={cardRef}
      style={{ position: 'absolute', left: pointX, top: pointY, transform: `rotate(${rotate}deg)`, opacity: isDragging ? 0.3 : 1 }}
      onMouseDown={(e) => select(e)}
      onTouchStart={(e) => select(e)}
    >
      <Card card={card} />
    </div>
  )
}

function CardsInHand() {
  const { hand } = useBattle()
  const curve = new Bezier({ x: 0, y: 0 }, { x: 0.25, y: 0.5 }, { x: 0.75, y: 0.5 }, { x: 1, y: 0 })
  let maxX = Math.min(96 * hand.length / 2, window.innerWidth / 1.6)
  let offsetY = -10 * hand.length

  return (
    <div className='cards' style={{ left: (window.innerWidth - maxX) / 2 - 48 }}>
      {hand.map((card: any, index: number) => {
        let hand_radio = hand.length === 1 ? 0.5 : index / (hand.length - 1)
        const pointX = hand_radio * maxX
        const pointY = hand.length < 3 ? -12 : curve.get(hand_radio).y * offsetY
        const rotate = hand.length < 3  ? 0 : hand_radio * 15
        return (
          <div key={card.id}>
            <CardInHand key={card.id} card={card} pointX={pointX} pointY={pointY} rotate={rotate} />
          </div>
        )
      })}
    </div>
  )
}

function Panel() {
  return (
    <div className='panel'>
      <p>Panel</p>
    </div>
  )
}

function CardDetails({ card }: { card: any }) {
  const { x, y } = usePointer()
  const deadPoint = useMemo(() => {
    return { x: x, y: y }
  }, [])
  const showing = Math.abs(deadPoint.x - x) < 30 && Math.abs(deadPoint.y - y) < 30

  return (
    <div className='preview-modal' style={{ display: showing ? 'flex' : 'none' }}>
      {card && <Card card={card} />}
    </div>
  )
}

function CardDragging () {
  const { x, y } = usePointer()
  const { selected, hand, setSelected } = useBattle()
  const card = selected ? hand.find((card: any) => card.id === selected) : null
  const casting = window.innerHeight - y > 265

  return (
    <div className='preview'>
      { card && <CardDetails card={card} /> }
      {card &&
        (<div style={{ position: 'fixed', left: x - 48, top: y - 110 }} className={clsx(casting ? 'casting' : '')}>
          <Card card={card} />
        </div>)
      }
    </div>
  )
}
export default function Page() {
  const { result, round, step, draw, initBattle, setSelected, casting } = useBattle()
  const { x, y } = usePointer()
  useEffect(() => {
    if (step === null && round === 0) {
      initBattle()
    }
    if (step === 'pending') {
      draw()
    }
    if (step === 'drawing') {
    }
  }, [round, step, draw, initBattle])

  const { set } = usePointer()
  const move = useCallback((evt: TouchEvent | MouseEvent) => {
    evt.preventDefault()
    // @ts-ignore
    if (evt.touches) {
      const e = evt as TouchEvent
      set(e.touches[0].clientX, e.touches[0].clientY)
    } else {
      const e = evt as MouseEvent
      set(e.clientX, e.clientY)
    }
  }, [set])
  const release = useCallback((evt: TouchEvent | MouseEvent) => {
    setSelected(null)
    if (window.innerHeight - y > 265) {
      casting()
    }
  }, [setSelected, y, casting])

  useEffect(() => {
    document.body.addEventListener('touchmove', move, { passive: false })
    document.body.addEventListener('mousemove', move, { passive: false })
    document.body.addEventListener('touchend', release, { passive: false })
    document.body.addEventListener('mouseup', release, { passive: false })
    document.oncontextmenu = () => false
    // 移除事件
    return () => {
      document.body.removeEventListener('touchmove', move)
      document.body.removeEventListener('mousemove', move)
      document.body.removeEventListener('touchend', release)
      document.body.removeEventListener('mouseup', release)
      document.oncontextmenu = () => true
    }
  }, [set, move, release])

  return (
    <main className='battle page' onClick={draw}>
      <Scene />
      <Panel />
      <CardsInHand />
      <CardDragging />
      <p>{result} {round} {step} {x} {y}</p>
    </main>
  )
}
