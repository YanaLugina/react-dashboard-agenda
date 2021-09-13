import React from 'react'
import style from './TimeLine.module.scss'
import { format } from 'date-fns'
import { chunkFrom, getDateLocale } from '../../utils'

const TimeLine = ({ chunksCount, chunksTime, children, locale, date }) => {
  return (
    <div className={style.timeLineWrap}>
      {[...Array(chunksCount).keys()].map((item, key) => {
        return (
          <div className={style.timeLegend} key={'TimeLine_' + key}>
            <div>
              {chunksCount < 48 && key % 2 === 0
                ? format(
                    chunkFrom(key, getDateLocale(date, locale), chunksTime),
                    'HH:mm'
                  )
                : ''}
            </div>
            <div className={style.timeLegendBrackets} />
          </div>
        )
      })}
      <div className={style.children}>{children}</div>
    </div>
  )
}

export default TimeLine
