import { useParams } from "react-router-dom"
import { useBuilding } from '../hook/useBuilding'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  return <>
    <p>{buildingData?.info}</p>
  </>
}
