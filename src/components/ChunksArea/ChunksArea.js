import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ChunkItem from '../ChunkItem'
// import TimeLine from '../TimeLine'
import { formatISO, format } from 'date-fns'
import XLegend from '../XLegend'

import style from './ChunksArea.module.scss'
import { chunkFrom, dateInRange, getDateLocale, chunkTo } from '../../utils'

function getObjectWithLegends(reserves, fieldName) {
  return reserves.reduce((accum, item) => {
    if (accum[item[fieldName]]) {
      accum[item[fieldName]].push(item)
    } else {
      accum[item[fieldName]] = [item]
    }
    return accum
  }, {})
}

const ChunksArea = ({
  chunksStyle,
  locale = 'Asia/Vladivostok',
  date = new Date(),
  id = '',
  chunksFree = [],
  chunksTime = 30,
  handleClickChunk = () => {},
  classesChunks = [],
  reserveTimes = [],
  types = [],
  resources = [],
  classes = []
}) => {
  const [filterLayer, setFilterLayer] = useState(['meetup'])
  const chunksCount = (24 * 60) / chunksTime

  const handleClickOnFree = (from, to, state, ...more) => {
    handleClickChunk(from, to, state, more)
  }

  const chunksCreate = (filterLayer, reserveTimes) => {
    // helpers ----->
    const dateLocale = getDateLocale(date, locale)
    // helpers <-----

    const elems = [...Array(chunksCount).keys()].map((item, key) => {
      const dateFrom = chunkFrom(key, dateLocale, chunksTime)
      const dateTo = chunkTo(key, dateLocale, chunksTime)
      const fromISO = formatISO(dateFrom)
      const toISO = formatISO(dateTo)

      let isAllowTime = true

      if (chunksFree.length > 0 === true) {
        isAllowTime = dateInRange(fromISO, toISO, chunksFree)
      }

      let isCheckedTimes = [{ type: '', isBusy: false, data: {} }]
      const reserveTimesFiltered =
        reserveTimes.length > 0
          ? reserveTimes.filter((item) =>
              filterLayer.length > 0 === true
                ? filterLayer.includes(item.type)
                : item
            )
          : reserveTimes

      if (reserveTimesFiltered.length > 0 === true) {
        isCheckedTimes = dateInRange(
          fromISO,
          toISO,
          reserveTimesFiltered,
          ['from', 'to'],
          true
        )
        console.log('isCheckedTime', isCheckedTimes)
      }

      let styleItem

      const typeFind = types.find((type) =>
        isCheckedTimes.map((item) => item.type).includes(type.id)
      )

      if (types && typeFind) {
        styleItem = {
          backgroundColor: typeFind.color,
          borderColor: typeFind.color
        }
      }
      if (chunksStyle) {
        styleItem = {
          ...styleItem,
          marginLeft: chunksStyle.marginLeft,
          marginRight: chunksStyle.marginRight,
          marginTop: chunksStyle.marginTop,
          marginBottom: chunksStyle.marginBottom,
          width: chunksStyle.width,
          borderRadius: chunksStyle.borderRadius
        }

        if (chunksStyle.border) {
          delete styleItem.borderColor
          styleItem.border = chunksStyle.border
        }
      }

      const classesChunk = isAllowTime
        ? classesChunks
        : [...classesChunks, 'blocked']

      return (
        <ChunkItem
          key={`chunk_${key + 1}`}
          id={key + 1}
          isAllow={isAllowTime}
          classes={classesChunk}
          styleItem={styleItem}
          label={
            typeFind
              ? `${format(dateFrom, 'HH:mm')} ${format(dateTo, 'HH:mm')}`
              : ''
          }
          handleClickOnFree={() =>
            handleClickOnFree(fromISO, toISO, isAllowTime, isCheckedTimes)
          }
        />
      )
    })

    return elems
  }

  const chunksNew = getObjectWithLegends(reserveTimes, 'resourceId')

  // const chunks = chunksCreate(filterLayer, reserveTimes);
  const chunks = Object.keys(chunksNew).map((item) => {
    const data = resources.find((leg) => leg.id === +item)
    const chunksPath = chunksCreate(filterLayer, chunksNew[item])
    return (
      <div className={style.chunkWithLegend} key={'chunksPath_' + item}>
        <XLegend resourceData={data} classes={classes} />
        <div className={style.chunkPath}>{chunksPath}</div>
      </div>
    )
  })

  return (
    <div className={style.dashboardAreaWrap}>
      <div
        id={id || `ChunksArea_${+new Date()}`}
        className={style.chunksAreaWrap}
      >
        {/* <TimeLine
          chunksCount={chunksCount}
          chunksTime={chunksTime}
          locale={locale}
          date={date}
          betweenAndWidth={}
        > */}
        <div className={style.chunks}>{chunks}</div>
        {/* </TimeLine> */}
      </div>
      <div>
        <button
          onClick={() =>
            setFilterLayer((s) => (s.length > 0 ? [] : ['meetup']))
          }
        >
          Layers
        </button>
      </div>
    </div>
  )
}

ChunksArea.propTypes = {
  chunksTime: PropTypes.number,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  chunksFree: PropTypes.array,
  classesChunks: PropTypes.arrayOf(PropTypes.oneOf(['fixedSize'])),
  date: PropTypes.string,
  locale: PropTypes.string,
  handleClickChunk: PropTypes.func,
  chunksStyle: PropTypes.object,
  resources: PropTypes.array,
  classes: PropTypes.array
}

export default ChunksArea
