import AppIcon from './app_icon'

export default function DesktopCard({
  name,
  style,
}: Readonly<{ name: string; style: any }>) {
  return (
    <div className="desktop-widget" style={ style }>
      <div className='icon_wrap'>
        <AppIcon name={name} />
      </div>
      <div className='name'>一张交接清单</div>
    </div>
  )
}
