'use client'
import './screen_fiter.css'

export default function Screen({ children }: { children: React.ReactNode }) {
  const height = 932
  const width = 430
  const isMobile = window.innerHeight > window.innerWidth
  let scaleX = 1
  let scaleY = 1
  if (isMobile) {
    if (window.innerWidth > width) {
      scaleX = window.innerWidth / width
    } else {
      scaleX = width / window.innerWidth
    }
    if (window.innerHeight > height) {
      scaleY = window.innerHeight / height
    } else {
      scaleY = height / window.innerHeight
    }
  } else {
    scaleY = window.innerHeight / height
    scaleX = window.innerWidth / width
    if (scaleY > scaleX) {
      scaleY = scaleX
    } else {
      scaleX = scaleY
    }
  }

  return (
    <div className="screen-filter-container">
      <div
        className="screen-filter"
        style={{
          transform: `scale(${scaleX}, ${scaleY})`,
          width: width + 'px',
          height: height + 'px',
          overflow: 'hidden',
          transformOrigin: 'center',
        }}
      >
        {children}
      </div>
    </div>
  )
}
