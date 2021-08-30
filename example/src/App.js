import React from 'react'

import { ChunksArea } from 'react-dashboard-agenda'
import 'react-dashboard-agenda/dist/index.css'

const App = () => {
  const handleClickChunk = (from, to, state) => {
    console.log('click on', from, ' - ', to, ', isAllowTime: ', state)
  }

  return (
  <ChunksArea
    id='my_dashboard'
    chunksTime={60}
    date='2021-08-27'
    classes={['fixedSize']}
    chunksFree={[
      { from: '2021-08-27T06:00:00+10:00', to: '2021-08-27T18:00:00+10:00'},
      { from: '2021-08-27T19:00:00+10:00', to: '2021-08-27T20:00:00+10:00'}
    ]}
    locale='Asia/Vladivostok'
    handleClickChunk={handleClickChunk}
  />
  )
}

export default App
