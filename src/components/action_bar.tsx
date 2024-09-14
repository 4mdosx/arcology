'use client'
import { Squircle } from 'corner-smoothing'
import AppIcon from './app_icon'
import Link from 'next/link'

import Find from './apps/find/main'
import Outpost from './apps/outpost/main'
export default function ActionBar({}) {
  return (
    <div id="action-bar_wrap">
      <Squircle className="action-bar" cornerRadius={40}>
        <Find />
        <Outpost />
        <AppIcon name="work" sub_icon="article" required="passion" timer={5} badge={5} />
        <AppIcon name="rest" />
      </Squircle>
    </div>
  )
}
