import { Loader2, Info } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useBuildings } from '../hook/useBuildings'
import { getFilteredList } from '../utils/filterList'

import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import ModelViewer from '../components/ModelViewer'
import FilterButtons from '../components/FilterButtons'
import AboutModal from '../components/AboutModal'

export default () => {
  const [buildingsData] = useBuildings()
  const [filter, setFilter] = useState('')
  const [showAboutModal, setShowAboutModal] = useState(false)
  const navigate = useNavigate()

  let filteredList = useMemo(
    () => getFilteredList(buildingsData, filter),
    [filter, buildingsData],
  )

  return (
    <Page>
      <AboutModal
        show={showAboutModal}
        onChange={(state) => setShowAboutModal(state)}
      />
      <div
        onClick={() => setShowAboutModal(true)}
        className="absolute right-1 bottom-1 rounded-lg p-2"
      >
        <Info size={28} color="#6b7280" />
      </div>
      <Navbar />
      <main className="grid h-full grid-rows-map gap-8 bg-base-100 py-6 px-16">
        <Card className="overflow-hidden p-0">
          <ModelViewer data={buildingsData} navigator={navigate} />
        </Card>
        <Card>
          <FilterButtons
            setFilter={setFilter}
            className="border-b-gray mb-2 justify-center border-b-2 pb-2"
          />

          {buildingsData.length == 0 ? (
            <div className="flex h-full max-h-36 items-center justify-center">
              <Loader2 className="animate-spin text-verbruik-72" size={48} />
            </div>
          ) : (
            <div className="grid max-h-32 auto-rows-auto grid-cols-5 gap-x-8 gap-y-2 overflow-y-auto px-8">
              <>
                {filteredList.map((building) => (
                  <Link
                    to={`buildings/${building.id}/info`}
                    className="flex items-center"
                    key={building.id}
                  >
                    {building.categorie ? (
                      <span
                        className={`h-4 w-4 flex-shrink-0 rounded-full ${
                          building.categorie &&
                          building?.categorie[0].toLowerCase() == 'productie'
                            ? 'bg-productie-80'
                            : 'bg-' +
                              building?.categorie[0].toLowerCase() +
                              '-100'
                        }`}
                      />
                    ) : (
                      <span className="h-4 w-4 flex-shrink-0 rounded-full border border-gray-400" />
                    )}
                    <p className="ml-2 font-roboto text-sm">{building.naam}</p>
                  </Link>
                ))}
              </>
            </div>
          )}
        </Card>
      </main>
    </Page>
  )
}
