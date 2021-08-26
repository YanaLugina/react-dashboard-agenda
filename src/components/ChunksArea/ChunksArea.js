import React from 'react'
import PropTypes from 'prop-types'
import ChunkItem from '../ChunkItem'
import { addMinutes, formatISO, startOfDay } from 'date-fns'

import style from './ChunksArea.module.scss'

const ChunksArea = ({
  locale = 'Asia/Vladivostok',
  date = new Date(),
  id = '',
  chunksBlocked = [],
  chunksTime = 30,
  handleClickChunk = () => {},
  classes = []
}) => {
  const chunksCount = (24 * 60) / chunksTime

  const handleClickOnFree = (from, to, state) => {
    handleClickChunk(from, to, state)
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
      elems.push(
        <ChunkItem
          key={`chunk_${i}`}
          id={i + 1}
          timeFrom={formatISO(chunkFrom(i))}
          timeTo={formatISO(chunkTo(i))}
          classes={classes}
          handleClickOnFree={() =>
            handleClickOnFree(
              formatISO(chunkFrom(i)),
              formatISO(chunkTo(i)),
              'hz'
            )
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
  chunksBlocked: PropTypes.array,
  classes: PropTypes.arrayOf(PropTypes.oneOf(['fixedSize'])),
  date: PropTypes.string,
  locale: PropTypes.string,
  handleClickChunk: PropTypes.func
}

export default ChunksArea
