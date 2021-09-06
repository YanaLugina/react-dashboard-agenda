# react-dashboard-agenda

> Dashboard Agenda for react

[![NPM](https://img.shields.io/npm/v/react-dashboard-agenda.svg)](https://www.npmjs.com/package/react-dashboard-agenda) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @yana4961/react-dashboard-agenda
```

## React version
React >17.0.2

## Usage

import ChunksArea and stylesheet

```jsx
import React from 'react'

import { ChunksArea } from 'react-dashboard-agenda'
import 'react-dashboard-agenda/dist/index.css'

const App = () => {
  const handleClickChunk = (from, to, state, more) => {
    console.log('click on', from, ' - ', to, ', isAllowTime: ', state, more)
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
    reserveTimes={[
      {
        id: 1,
        from: '2021-08-27T08:00:00+10:00',
        to: '2021-08-27T09:00:00+10:00',
        type: 'meetup',
        data: {
          title: 'Планерка'
        }
      },
      {
        id: 2,
        from: '2021-08-27T12:00:00+10:00',
        to: '2021-08-27T14:00:00+10:00',
        type: 'social',
        data: {
          title: 'Встреча с клиентами'
        }
      },
      {
        id: 3,
        from: '2021-08-27T12:00:00+10:00',
        to: '2021-08-27T13:00:00+10:00',
        type: 'social',
        data: {
          title: 'Вечеринка'
        }
      }
    ]}
    types={[{id: 'meetup', color: '#E9F6FB'}, { id: 'social', color: '#f7c0ea' }]}
  />
  )
}

export default App
```

## License

MIT © [YanaLugina &lt;yana4961@gmail.com&gt;](https://github.com/YanaLugina &lt;yana4961@gmail.com&gt;)
