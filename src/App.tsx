import { useState } from 'react'
import { Building, Map } from 'lucide-react'
import { Sidebar } from './components/SideBar'
import { TopBarNav } from './components/TopBarNav'
import { Content } from './components/Content'

function App() {
  return (
    <div>
      <Sidebar />
      <TopBarNav />
      <Content />
    </div>
  )
}

export default App
