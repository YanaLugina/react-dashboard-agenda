import React from 'react'

import { ChunksArea } from 'react-dashboard-agenda'
import 'react-dashboard-agenda/dist/index.css'
import img1 from './assets/avatar~hgQOkIra.svg'
import img2 from './assets/avatar2~IUSznSPb.svg'

const App = () => {
  const handleClickChunk = (from, to, state, more) => {
    console.log('click on', from, ' - ', to, ', isAllowTime: ', state, more)
  }

  return (
    <div style={{ padding: '10px 20px' }}>
      <ChunksArea
        id='my_dashboard'
        chunksTime={60}
        chunksStyle={{marginLeft: 4, marginRight: 4}}
        date='2021-08-27'
        classesChunks={['fixedSize']}
        chunksFree={[
          { from: '2021-08-27T06:00:00+10:00', to: '2021-08-27T18:00:00+10:00'},
          { from: '2021-08-27T19:00:00+10:00', to: '2021-08-27T20:00:00+10:00'}
        ]}
        locale='Asia/Vladivostok'
        handleClickChunk={handleClickChunk}
        reserveTimes={[
          {
            id: 1,
            from: '2021-08-27T08:00:00+10:00',
            to: '2021-08-27T09:00:00+10:00',
            type: 'meetup',
            resourceId: 1,
            data: {
              title: 'Планерка'
            }
          },
          {
            id: 2,
            from: '2021-08-27T12:00:00+10:00',
            to: '2021-08-27T14:00:00+10:00',
            type: 'social',
            resourceId: 1,
            data: {
              title: 'Встреча с клиентами'
            }
          },
          {
            id: 3,
            from: '2021-08-27T10:00:00+10:00',
            to: '2021-08-27T11:00:00+10:00',
            type: 'social',
            resourceId: 2,
            data: {
              title: 'Встреча с клиентами'
            }
          },
          {
            id: 4,
            from: '2021-08-27T12:00:00+10:00',
            to: '2021-08-27T15:00:00+10:00',
            type: 'meetup',
            resourceId: 2,
            data: {
              title: 'Вечеринка'
            }
          },
          {
            id: 4,
            from: '2021-08-27T12:00:00+10:00',
            to: '2021-08-27T14:00:00+10:00',
            type: 'meetup',
            resourceId: 1,
            data: {
              title: 'Вечеринка'
            }
          }
        ]}
        types={[{id: 'meetup', color: '#E9F6FB'}, { id: 'social', color: '#f7c0ea' }]}
        resources={[
          { id: 1, label: 'first', title: 'First hero', description: 'La-la-la', image: img1 },
          { id: 2, label: 'second', title: 'Second hero', description: 'Sa-sa-sa', image: img2 }
        ]}
      />
    </div>

  )
}

export default App
