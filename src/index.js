import React from 'react'
import styles from './styles.module.css'
import ChunksArea from './components/ChunksArea'

const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export { ChunksArea, ExampleComponent }
