'use client'
import { Squircle } from 'corner-smoothing'


export default function ActionBar({}) {
  return (
    <div id="action-bar_wrap">
      <Squircle className="action-bar" cornerRadius={40}>
        <div className="action">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M402-40q-30 0-56-13.5T303-92L48-465l24-23q19-19 45-22t47 12l116 81v-383q0-17 11.5-28.5T320-840q17 0 28.5 11.5T360-800v537L212-367l157 229q5 8 14 13t19 5h278q33 0 56.5-23.5T760-200v-560q0-17 11.5-28.5T800-800q17 0 28.5 11.5T840-760v560q0 66-47 113T680-40H402Zm38-440v-400q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v400h-80Zm160 0v-360q0-17 11.5-28.5T640-880q17 0 28.5 11.5T680-840v360h-80ZM486-300Z"/></svg>
        </div>
        <div className='action'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="30px" fill="#5f6368"><path d="M80-200v-240q0-27 11-49t29-39v-112q0-50 35-85t85-35h160q23 0 43 8.5t37 23.5q17-15 37-23.5t43-8.5h160q50 0 85 35t35 85v112q18 17 29 39t11 49v240h-80v-80H160v80H80Zm440-360h240v-80q0-17-11.5-28.5T720-680H560q-17 0-28.5 11.5T520-640v80Zm-320 0h240v-80q0-17-11.5-28.5T400-680H240q-17 0-28.5 11.5T200-640v80Zm-40 200h640v-80q0-17-11.5-28.5T760-480H200q-17 0-28.5 11.5T160-440v80Zm640 0H160h640Z"/></svg>
        </div>
        {/* <div className="action" id="study">
          <span>学习</span>
        </div>
        <div className="action" id="dream">
          <span>梦想</span>
        </div> */}
      </Squircle>
    </div>
  )
}
