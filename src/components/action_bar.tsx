'use client'
import { Squircle } from 'corner-smoothing'

import Find from './apps/find/main'
import Outpost from './apps/outpost/main'
import Issue from './apps/issue/main'
import Deck from './apps/deck/main'

export default function ActionBar({}) {
  return (
    <div id="action-bar_wrap">
      <Squircle className="action-bar" cornerRadius={40}>
        <Find />
        <Outpost />
        <Issue />
        <Deck />
        {/* <AppIcon name="rest" /> */}
      </Squircle>
    </div>
  )
}
