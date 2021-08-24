import React from 'react'
import PropTypes from 'prop-types'

import style from './ChunksArea.module.scss'

const ChunkFree = ({ id, handleClickOnFree = () => {}, classes = [] }) => {
  return (
    <div
      onClick={handleClickOnFree}
      className={
        style.chunk + classes.map((item) => ' ' + style[item]).join('')
      }
    >
      {id}
    </div>
  )
}

const ChunksArea = ({ chunksTime = 30 }) => {
  const chunksCount = (24 * 60) / chunksTime

  const handleClickOnFree = (data) => {
    const hh = Math.floor(data)
    const minetsRaw = data.toFixed(2) * 100 + ''
    const minetsRawPercent = +minetsRaw.slice(-2) / 100
    const mm = minetsRawPercent ? Math.floor(60 * minetsRawPercent) : 0

    console.log('clicked hh:', hh)
    console.log('minets mm:', mm)
  }

  const chunksCreate = () => {
    const elems = []

    for (let i = 0; i < chunksCount; i++) {
      elems.push(
        <ChunkFree
          key={`chunk_${i}`}
          id={i + 1}
          classes={['fixedSize']}
          handleClickOnFree={() =>
            handleClickOnFree(((i + 1) * chunksTime) / 60)
          }
        />
      )
    }

    return elems
  }

  const chunks = chunksCreate()

  return <div className={style.chunksAreaWrap}>{chunks}</div>
}

ChunksArea.propTypes = {
  chunksTime: PropTypes.number
}

export default ChunksArea
