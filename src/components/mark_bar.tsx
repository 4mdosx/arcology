'use client'
import { Squircle } from 'corner-smoothing'
import './mark_bar.css'

export default function MarkBar({}) {
  return (
    <div id="mark-bar_wrap">
      <Squircle className="mark-bar" cornerRadius={36}>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
        <div className="cell"></div>
      </Squircle>
    </div>
  )
}
