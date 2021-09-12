import React from 'react'
import style from './ChunkItem.module.scss'
import PropTypes from 'prop-types'

const ChunkItem = ({
  id,
  styleItem,
  handleClickOnFree = () => {},
  classes = []
}) => {
  return (
    <div
      onClick={handleClickOnFree}
      style={styleItem}
      className={
        style.chunk + classes.map((item) => ' ' + style[item]).join('')
      }
    >
      {id}
    </div>
  )
}

ChunkItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  classes: PropTypes.arrayOf(PropTypes.oneOf(['fixedSize', 'blocked'])),
  handleClickOnFree: PropTypes.func,
  styleItem: PropTypes.object
}

export default ChunkItem
