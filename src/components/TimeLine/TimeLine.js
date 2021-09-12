import React from 'react'
import style from './TimeLine.module.scss'

const TimeLine = ({ children }) => {
  return (
    <div className={style.timeLineWrap}>
      times chunks
      <div className={style.children}>{children}</div>
    </div>
  )
}

export default TimeLine
