import React from 'react'
import PropTypes from 'prop-types'
import ChunkItem from '../ChunkItem'
import { addMinutes, formatISO, startOfDay } from 'date-fns'

import style from './ChunksArea.module.scss'
import { dateInRange } from '../../utils'

const ChunksArea = ({
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
  const chunksCount = (24 * 60) / chunksTime

  const handleClickOnFree = (from, to, state, ...more) => {
    handleClickChunk(from, to, state, more)
  }

  const chunksCreate = () => {
    const elems = []

    const dateLocale = formatISO(startOfDay(new Date(date)), {
      locale: locale
    })

    const chunkFrom = (i) => addMinutes(new Date(dateLocale), chunksTime * i)
    const chunkTo = (i) => {
      return addMinutes(new Date(dateLocale), chunksTime * i + chunksTime)
    }

    for (let i = 0; i < chunksCount; i++) {
      const fromISO = formatISO(chunkFrom(i))
      const toISO = formatISO(chunkTo(i))

      let isAllowTime = true

      if (chunksFree.length > 0 === true) {
        isAllowTime = dateInRange(fromISO, toISO, chunksFree)
      }

      let isCheckedTime = { type: '', isChecked: false, data: {} }
      if (reserveTimes.length > 0 === true) {
        isCheckedTime = dateInRange(
          fromISO,
          toISO,
          reserveTimes,
          ['from', 'to'],
          true
        )
      }

      const classesChunk = isAllowTime ? classes : [...classes, 'blocked']
      elems.push(
        <ChunkItem
          key={`chunk_${i}`}
          id={i + 1}
          isAllow={isAllowTime}
          classes={classesChunk}
          styleItem={
            types.find((type) => type.id === isCheckedTime.type)
              ? types.find((type) => type.id === isCheckedTime.type).color
              : null
          }
          handleClickOnFree={() =>
            handleClickOnFree(fromISO, toISO, isAllowTime, isCheckedTime)
          }
        />
      )
    }

    return elems
  }

  const chunks = chunksCreate()

  return (
    <div
      id={id || `ChunksArea_${+new Date()}`}
      className={style.chunksAreaWrap}
    >
      {chunks}
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
  handleClickChunk: PropTypes.func
}

export default ChunksArea
