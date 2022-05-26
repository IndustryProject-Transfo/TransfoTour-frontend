import { Lightbulb } from 'lucide-react'
import { useParams } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { useBuilding } from '../hook/useBuilding'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  return (
    <>
      <div className="flex h-full gap-6">
        <div className="flex flex-1 flex-col">
          <SectionTitle title="info" />
          <div className="flex-auto overflow-auto rounded bg-white p-4 font-roboto">
            {buildingData?.info}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <SectionTitle title="wist je dat?" />
          <div className="flex flex-auto flex-col gap-6">
            <div className="flex flex-1 gap-4 rounded bg-white">
              <div className="flex items-center justify-center bg-erfgoed-100 px-6">
                <Lightbulb size={48} className="text-white" />
              </div>
              <p className="flex items-center font-roboto">wist je</p>
            </div>

            <div className="flex flex-1 gap-4 rounded bg-white">
              <div className="flex items-center justify-center bg-erfgoed-100 px-6">
                <Lightbulb size={48} className="text-white" />
              </div>
              <p className="flex items-center font-roboto">wist je</p>
            </div>

            <div className="flex flex-1 gap-4 rounded bg-white">
              <div className="flex items-center justify-center bg-erfgoed-100 px-6">
                <Lightbulb size={48} className="text-white" />
              </div>
              <p className="flex items-center font-roboto">wist je</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
