import { Navigate, Route, Routes } from 'react-router-dom'
import Detail from '../screens/Detail'
import Map from '../screens/Map'
import {} from 'airtable'
import Data from '../screens/Data'
import Info from "../screens/Info"
import Quiz from "../screens/Quiz"

export default () => {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/buildings">
        <Route path=":building" element={<Detail />}>
          <Route path="info" element={<Info />} />
          <Route path="data" element={<Data />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>
      </Route>
    </Routes>
  )
}
