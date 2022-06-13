import { Link, Outlet, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useBuilding } from '../hook/useBuilding'
import { useBuildings } from '../hook/useBuildings'
import { getFilteredList } from '../utils/filterList'
import SectionTitle from '../components/SectionTitle'
import TransfoMap from '../components/TransfoMap'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import Transfo from '../assets/transfo.png'

import { ReactComponent as QRcode } from '../assets/svg/QRcode.svg'
import { Detector } from 'react-detect-offline'
import Tag from '../components/Tag'
import FilterButtons from '../components/FilterButtons'
import Card from '../components/Card'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  const [buildingsData] = useBuildings()
  const [filter, setFilter] = useState('')

  let filteredList = useMemo(
    () => getFilteredList(buildingsData, filter),
    [filter, buildingsData],
  )

  return (
    <Page>
      <Navbar title={buildingData?.naam} categorie={buildingData?.categorie} />
      <main className="grid grid-flow-row grid-cols-4 grid-rows-cards gap-6 bg-base-100 py-6 px-16">
        <section className="col-span-2 flex flex-col justify-between">
          <SectionTitle title="gebouw" />
          <Card className="grid h-full grid-cols-2 gap-4 overflow-hidden p-0 pr-4">
            {/* <Online> */}
            {buildingData ? (
              buildingData.profielfoto ? (
                <div className="aspect-w-4 aspect-h-2">
                  <img
                    src={`${buildingData?.profielfoto[0].thumbnails.large.url}`}
                    alt={`${buildingData?.naam}`}
                    className="h-full overflow-hidden object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-w-4 aspect-h-2">
                  <img
                    src={Transfo}
                    alt="Transfo"
                    className="h-full overflow-hidden object-cover"
                  />
                </div>
              )
            ) : (
              <Loader2
                className="m-auto animate-spin text-verbruik-72"
                size={48}
              />
            )}
            {/* </Online> */}
            {/* <Offline>
              <Loader2
                className="m-auto animate-spin text-verbruik-72"
                size={48}
              />
            </Offline> */}

            <div className="my-4 flex flex-col gap-1">
              <div className="flex max-h-24 flex-1 flex-wrap gap-1 overflow-y-auto overflow-x-hidden">
                {buildingData?.hashtags && buildingData?.hashtags.length > 0 ? (
                  buildingData?.hashtags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))
                ) : (
                  <></>
                )}
              </div>

              <div className="flex flex-1 flex-col items-end justify-end">
                <QRcode className="h-24 w-auto rounded bg-white p-1" />
              </div>
            </div>
          </Card>
        </section>

        <section className="col-span-2 flex flex-col justify-between">
          <div className="mb-2 flex justify-between">
            <SectionTitle title="plattegrond" className="mb-0" />
            <FilterButtons setFilter={setFilter} />
          </div>

          <Card className="flex h-full gap-1">
            <div className="flex flex-1 items-center justify-center">
              <TransfoMap selectedBuilding={buildingData?.building_id} />
            </div>
            <div className="flex max-h-52 flex-1 flex-col divide-y-2 overflow-auto rounded border p-2 ">
              {buildingsData && buildingsData.length > 0 ? (
                filteredList.map(
                  (buildingData) =>
                    buildingData.id != building && (
                      <Detector
                        key={buildingData.id}
                        render={({ online }) => (
                          <Link
                            to={`../${buildingData.id}/info`}

                            // className={`${!online && 'pointer-events-none'}`}
                          >
                            <button className="flex w-full items-center justify-between p-1">
                              <p className="text-left font-roboto">
                                {buildingData.naam}
                              </p>
                              {buildingData.categorie ? (
                                <span
                                  className={`h-4 w-4 flex-shrink-0 rounded-full ${
                                    buildingData.categorie &&
                                    buildingData?.categorie[0].toLowerCase() ==
                                      'productie'
                                      ? 'bg-productie-80'
                                      : 'bg-' +
                                        buildingData?.categorie[0].toLowerCase() +
                                        '-100'
                                  }`}
                                />
                              ) : (
                                <span className="h-4 w-4 flex-shrink-0 rounded-full border border-gray-400" />
                              )}
                            </button>
                          </Link>
                        )}
                      />
                    ),
                )
              ) : (
                <Loader2
                  className="m-auto animate-spin text-verbruik-72"
                  size={48}
                />
              )}
            </div>
          </Card>
        </section>

        <section className="col-span-4">
          <Outlet />
        </section>
      </main>
    </Page>
  )
}
