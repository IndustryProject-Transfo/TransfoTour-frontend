import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import { useBuildings } from '../hook/useBuildings'
import { getFilteredList } from '../utils/filterList'

export default () => {
  const [buildingsData] = useBuildings()
  const [filter, setFilter] = useState('')

  let filteredList = useMemo(
    () => getFilteredList(buildingsData, filter),
    [filter, buildingsData],
  )

  console.log(buildingsData)

  return (
    <Page>
      <Navbar />
      <main className="grid h-full grid-rows-map gap-8 bg-base-100 py-6 px-16">
        <div className="bg-white">Map</div>
        <Card>
          <ul className="border-b-gray mb-2 flex justify-center gap-3 border-b-2 pb-2">
            <li className="flex items-center rounded bg-verbruik-72 px-3 py-1 font-roboto text-sm text-white">
              <button onClick={() => setFilter('')}>All</button>
            </li>
            <li className="flex items-center rounded bg-productie-80 px-3 py-1 font-roboto text-sm text-white">
              <button onClick={() => setFilter('productie')}>Productie</button>
            </li>
            <li className="flex items-center rounded bg-opslag-100 px-3 py-1 font-roboto text-sm text-white">
              <button onClick={() => setFilter('opslag')}>Opslag</button>
            </li>
            <li className="flex items-center rounded bg-verbruik-100 px-3 py-1 font-roboto text-sm text-white">
              <button onClick={() => setFilter('verbruik')}>Verbruik</button>
            </li>
          </ul>

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
