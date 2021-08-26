import React from 'react'

import { ChunksArea } from 'react-dashboard-agenda'
import 'react-dashboard-agenda/dist/index.css'

const App = () => {
  const handleClickChunk = (from, to, state) => {
    console.log('click on', from, ' - ', to, ', state: ', state)
  }

  return (
  <ChunksArea
    id='my_dashboard'
    chunksTime={60}
    date='2021-08-27'
    classes={['fixedSize']}
    chunksBlocked={[
      { timeFrom: '2021-08-27T06:00:00+10:00', timeTo: '2021-08-27T06:30:00+10:00'}
    ]}
    locale='Asia/Vladivostok'
    handleClickChunk={handleClickChunk}
  />
  )
}

export default App
