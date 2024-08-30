'use client'
import { Squircle } from 'corner-smoothing'
import AppIcon from './app_icon'
import Link from 'next/link'

export default function ActionBar({}) {
  return (
    <div id="action-bar_wrap">
      <Squircle className="action-bar" cornerRadius={40}>
        <Link href="/">
          <AppIcon name="home" />
        </Link>
        <AppIcon name="work" sub_icon="article" required="passion" timer={5} badge={5} />
        <AppIcon name="rest" />
      </Squircle>
    </div>
  )
}
