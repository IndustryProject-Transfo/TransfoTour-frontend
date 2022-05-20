import { Navigate, Route, Routes } from 'react-router-dom'
import Detail from '../screens/Detail'
import Map from '../screens/Map'
import {} from 'airtable'
import Section from '../screens/Section'
import Data from './Data'

export default () => {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/buildings">
        <Route path=":building" element={<Detail />}>
          <Route path="info" element={<Section />} />
          <Route path="data" element={<Data />} />
          <Route path="quiz" element={<Section />} />
        </Route>
      </Route>
    </Routes>
  )
}
