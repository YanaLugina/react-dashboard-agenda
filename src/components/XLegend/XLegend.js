import React from 'react'

import style from './XLegend.module.scss'
import avatar from './assets/avatar.svg'

const XLegend = ({ resourceData, withoutImg = false, classes = [] }) => {
  return (
    <div
      className={
        style.xLegend + classes.map((item) => ' ' + style[item]).join('')
      }
    >
      <div className={style.imageWrap}>
        {withoutImg ? (
          ''
        ) : (
          <img
            className={style.image}
            src={resourceData?.image || avatar}
            alt='ava'
          />
        )}
      </div>
      <div className={style.text}>
        <div className={style.title}>{resourceData?.title}</div>
        <div className={style.description}>{resourceData?.description}</div>
      </div>
    </div>
  )
}

export default XLegend
