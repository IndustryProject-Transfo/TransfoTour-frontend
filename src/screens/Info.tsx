import { Lightbulb } from 'lucide-react'
import { useParams } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { useBuilding } from '../hook/useBuilding'
import { useFacts } from '../hook/useFacts'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  const [facts] = useFacts(buildingData!)

  return (
    <>
      <div className="flex h-full gap-6">
        <div className="flex flex-1 flex-col">
          <SectionTitle title="info" />
          <div className="flex-auto rounded bg-white p-4 font-roboto">
            <p className="max-h-80 overflow-auto">{buildingData?.info}</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <SectionTitle title="wist je dat?" />
          <div className="flex flex-auto flex-col gap-6">
            <div className="flex flex-1 gap-4 rounded bg-white">
              <div
                className={`flex items-center justify-center ${
                  buildingData?.categorie[0].toLowerCase() == 'productie'
                    ? 'bg-productie-80'
                    : 'bg-' + buildingData?.categorie[0].toLowerCase() + '-100'
                } px-6`}
              >
                <Lightbulb size={48} className="text-white" />
              </div>
              <p className="flex items-center font-roboto">
                {facts[0] ? facts[0] : 'De Transfo site sinds 1913 bestaat.'}
              </p>
            </div>

            <div className="flex flex-1 gap-4 rounded bg-white">
              <div
                className={`flex items-center justify-center ${
                  buildingData?.categorie[0].toLowerCase() == 'productie'
                    ? 'bg-productie-80'
                    : 'bg-' + buildingData?.categorie[0].toLowerCase() + '-100'
                } px-6`}
              >
                <Lightbulb size={48} className="text-white" />
              </div>
              <p className="flex items-center font-roboto">
                {facts[1]
                  ? facts[1]
                  : 'De Transfo site produceerde tot 1962 elektriciteit.'}
              </p>
            </div>

            <div className="flex flex-1 gap-4 rounded bg-white">
              <div
                className={`flex items-center justify-center ${
                  buildingData?.categorie[0].toLowerCase() == 'productie'
                    ? 'bg-productie-80'
                    : 'bg-' + buildingData?.categorie[0].toLowerCase() + '-100'
                } px-6`}
              >
                <Lightbulb size={48} className="text-white" />
              </div>
              <p className="flex items-center font-roboto">
                {facts[2]
                  ? facts[2]
                  : 'De Transfo site klimaatneutraal probeert te worden.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
