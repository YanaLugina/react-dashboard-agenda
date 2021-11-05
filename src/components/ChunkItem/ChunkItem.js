import React, { memo } from 'react'
import style from './ChunkItem.module.scss'
import PropTypes from 'prop-types'

const ChunkItem = ({
  id,
  styleItem,
  label,
  handleClickOnFree = () => {},
  classes = []
}) => {
  return (
    <div
      id={id}
      onClick={handleClickOnFree}
      style={styleItem}
      className={
        style.chunk + classes.map((item) => ' ' + style[item]).join('')
      }
    >
      {label}
    </div>
  )
}

ChunkItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  label: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.oneOf(['fixedSize', 'blocked'])),
  handleClickOnFree: PropTypes.func,
  styleItem: PropTypes.object
}

export default memo(ChunkItem)
