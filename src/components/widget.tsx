'use client'
import AppIcon from './app_icon'

function clickDataMaker() {
  return {
    type: 'click',
    data: {
      name: 'article',
    },
  }
}

interface DesktopWidgetProps {
  name: string
  style: any
  onClick?: (data: any) => void
  onDrag?: () => void
}

export default function DesktopWidget({
  name,
  style,
  ...props
}: DesktopWidgetProps) {
  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.classList.add('dragging')
  }
  function onDragEnd(e: React.DragEvent<HTMLDivElement>) {
    e.currentTarget.classList.remove('dragging')
  }

  function onClick() {
    if (!props.onClick) return
    const data = clickDataMaker()
    props.onClick(data)
  }
  return (
    <div className="desktop-widget" style={style}>
      <div className="icon_wrap" onClick={onClick}>
        <div
          className="draggable"
          draggable={true}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <AppIcon name={name} />
        </div>
      </div>
      <div className="name">一张交接清单</div>
    </div>
  )
}
