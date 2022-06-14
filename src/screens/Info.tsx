import { Lightbulb, Loader2 } from 'lucide-react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
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
          <Card className="flex-auto p-8 font-roboto">
            {buildingData ? (
              <p className="max-h-72 overflow-auto pr-6 leading-loose transition	">
                {buildingData?.info}
              </p>
            ) : (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin text-verbruik-72" size={48} />
              </div>
            )}
          </Card>
        </div>

        <div className="flex flex-1 flex-col">
          <SectionTitle title="wist je dat?" />
          <div className="flex flex-auto flex-col gap-6">
            <Card className="flex flex-1 gap-4 overflow-hidden p-0">
              <div
                className={`flex items-center justify-center transition-colors ${
                  buildingData?.categorie
                    ? buildingData?.categorie[0].toLowerCase() == 'productie'
                      ? 'bg-productie-80'
                      : 'bg-' +
                        buildingData?.categorie[0].toLowerCase() +
                        '-100'
                    : 'bg-gray-400'
                }`}
              >
                <Lightbulb size={48} className="mx-6 text-white" />
              </div>
              <p className="flex items-center pr-4 font-roboto">
                {facts[0] ? facts[0] : 'De Transfo site sinds 1913 bestaat.'}
              </p>
            </Card>

            <Card className="flex flex-1 gap-4 overflow-hidden p-0">
              <div
                className={`flex items-center justify-center transition-colors ${
                  buildingData?.categorie
                    ? buildingData?.categorie[0].toLowerCase() == 'productie'
                      ? 'bg-productie-80'
                      : 'bg-' +
                        buildingData?.categorie[0].toLowerCase() +
                        '-100'
                    : 'bg-gray-400'
                }`}
              >
                <Lightbulb size={48} className="mx-6 text-white" />
              </div>
              <p className="flex items-center pr-4 font-roboto">
                {facts[1]
                  ? facts[1]
                  : 'De Transfo site produceerde tot 1962 elektriciteit.'}
              </p>
            </Card>

            <Card className="flex flex-1 gap-4 overflow-hidden p-0">
              <div
                className={`flex items-center justify-center transition-colors ${
                  buildingData?.categorie
                    ? buildingData?.categorie[0].toLowerCase() == 'productie'
                      ? 'bg-productie-80'
                      : 'bg-' +
                        buildingData?.categorie[0].toLowerCase() +
                        '-100'
                    : 'bg-gray-400'
                }`}
              >
                <Lightbulb size={48} className="mx-6 text-white" />
              </div>

              <p className="flex items-center pr-4 font-roboto">
                {facts[2]
                  ? facts[2]
                  : 'De Transfo site klimaatneutraal probeert te worden.'}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
