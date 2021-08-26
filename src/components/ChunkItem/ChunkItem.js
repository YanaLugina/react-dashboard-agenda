import React from 'react'
import style from './ChunkItem.module.scss'

const ChunkItem = ({ id, handleClickOnFree = () => {}, classes = [] }) => {
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

export default ChunkItem
