import React from 'react'

import './App.css'
import { Button } from '../Button/Button'

function App() {
  return (
    <div className="App">
      <h1>Visual Comic Reader</h1>
      <Button size="small">Button</Button>
      <Button size="medium" color="secondary">
        Button
      </Button>
      <Button size="large" color="success">
        Button
      </Button>
      <Button color="warning">Button</Button>
      <Button color="error">Button</Button>
      <Button size="small" color="ghost">
        Button
      </Button>
      <Button disabled color="ghost">
        Button
      </Button>
    </div>
  )
}

export default App
