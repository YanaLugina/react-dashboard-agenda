import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ChunkItem from '../ChunkItem'
import TimeLine from '../TimeLine'
import { addMinutes, formatISO, startOfDay } from 'date-fns'

import style from './ChunksArea.module.scss'
import { dateInRange } from '../../utils'

const ChunksArea = ({
  chunksStyle,
  locale = 'Asia/Vladivostok',
  date = new Date(),
  id = '',
  chunksFree = [],
  chunksTime = 30,
  handleClickChunk = () => {},
  classes = [],
  reserveTimes = [],
  types = []
}) => {
  const [filterLayer, setFilterLayer] = useState(['meetup'])
  const chunksCount = (24 * 60) / chunksTime

  const handleClickOnFree = (from, to, state, ...more) => {
    handleClickChunk(from, to, state, more)
  }

  const chunksCreate = (filterLayer) => {
    // helpers ----->
    const dateLocale = formatISO(startOfDay(new Date(date)), {
      locale: locale
    })

    const chunkFrom = (i) => addMinutes(new Date(dateLocale), chunksTime * i)
    const chunkTo = (i) => {
      return addMinutes(new Date(dateLocale), chunksTime * i + chunksTime)
    }

    // helpers <-----

    const elems = [...Array(chunksCount).keys()].map((item, key) => {
      const fromISO = formatISO(chunkFrom(key))
      const toISO = formatISO(chunkTo(key))

      let isAllowTime = true

      if (chunksFree.length > 0 === true) {
        isAllowTime = dateInRange(fromISO, toISO, chunksFree)
      }

      let isCheckedTime = { type: '', isBusy: false, data: {} }
      const reserveTimesFiltered =
        reserveTimes.length > 0
          ? reserveTimes.filter((item) =>
              filterLayer.length > 0 === true
                ? filterLayer.includes(item.type)
                : item
            )
          : reserveTimes

      if (reserveTimesFiltered.length > 0 === true) {
        isCheckedTime = dateInRange(
          fromISO,
          toISO,
          reserveTimesFiltered,
          ['from', 'to'],
          true
        )
      }

      let styleItem

      const typeFind = types.find((type) => type.id === isCheckedTime.type)

      if (types && typeFind) {
        styleItem = {
          backgroundColor: typeFind.color,
          borderColor: typeFind.color
        }
      }
      if (chunksStyle) {
        styleItem = {
          ...styleItem,
          ...chunksStyle
        }
      }

      const classesChunk = isAllowTime ? classes : [...classes, 'blocked']
      return (
        <ChunkItem
          key={`chunk_${key + 1}`}
          id={key + 1}
          isAllow={isAllowTime}
          classes={classesChunk}
          styleItem={styleItem}
          handleClickOnFree={() =>
            handleClickOnFree(fromISO, toISO, isAllowTime, isCheckedTime)
          }
        />
      )
    })

    return elems
  }

  const chunks = chunksCreate(filterLayer)

  return (
    <div>
      <div
        id={id || `ChunksArea_${+new Date()}`}
        className={style.chunksAreaWrap}
      >
        <TimeLine>{chunks}</TimeLine>
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
  classes: PropTypes.arrayOf(PropTypes.oneOf(['fixedSize'])),
  date: PropTypes.string,
  locale: PropTypes.string,
  handleClickChunk: PropTypes.func,
  chunksStyle: PropTypes.object
}

export default ChunksArea
