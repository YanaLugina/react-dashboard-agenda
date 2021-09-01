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
```

## License

MIT © [YanaLugina &lt;yana4961@gmail.com&gt;](https://github.com/YanaLugina &lt;yana4961@gmail.com&gt;)
