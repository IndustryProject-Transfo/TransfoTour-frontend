import { useState } from 'react'

function App() {
  return (
    <div>
      <div className="App">Hello</div>
      {/* @ts-ignore */}
      <p>env test: {window['env']['APIurl']}</p>
    </div>
  )
}

export default App
