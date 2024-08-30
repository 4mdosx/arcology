'use client'
import AppIcon from './app_icon'
import Link from 'next/link'

interface DesktopAppProps {
  name: string
  style: any,
  href: string
}

export default function DesktopApp({
  name,
  style,
  ...props
}: DesktopAppProps) {


  return (
    <div className="desktop-widget" style={style}>
      <Link className="icon_wrap" href={props.href}>
        <div
        >
          <AppIcon name={name} />
        </div>
      </Link>
      <div className="name">{ name }</div>
    </div>
  )
}
