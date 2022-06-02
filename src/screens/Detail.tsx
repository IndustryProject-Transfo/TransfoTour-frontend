import { Link, Outlet, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { Loader2 } from 'lucide-react'
import { useBuilding } from '../hook/useBuilding'
import { useBuildings } from '../hook/useBuildings'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'

import SectionTitle from '../components/SectionTitle'
import TransfoMap from '../components/TransfoMap'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import Tag from '../components/Tag'

import Transfo from '/src/assets/transfo.png'
import { ReactComponent as QRcode } from '/src/assets/svg/qrcode.svg'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  const [buildingsData] = useBuildings()
  const [filter, setFilter] = useState('')

  function setFilterByCategory(category: string) {
    setFilter(category)
  }

  function getFilteredList() {
    buildingsData.sort((a, b) => (a.volgorde > b.volgorde ? 1 : -1))

    if (!filter) {
      return buildingsData
    }

    return buildingsData!.filter((item) => {
      if (item.categorie)
        return item.categorie.includes(capitalizeFirstLetter(filter))
    })
  }

  let filteredList = useMemo(getFilteredList, [filter, buildingsData])

  return (
    <Page>
      <Navbar title={buildingData?.naam} categorie={buildingData?.categorie} />
      <main className="grid grid-flow-row grid-cols-4 grid-rows-cards gap-6 bg-base-100 py-6 px-16">
        <section className="col-span-2 flex flex-col justify-between">
          <SectionTitle title="gebouw" />
          <div className="grid h-full grid-cols-2 gap-4 overflow-hidden rounded bg-white pr-4">
            {buildingData ? (
              buildingData.profielfoto ? (
                <div className="overflow-hidden">
                  <img
                    src={`${buildingData?.profielfoto[0].url}`}
                    alt={`${buildingData?.naam}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="overflow-hidden">
                  <img
                    src={Transfo}
                    alt="Transfo"
                    className="h-full w-full object-cover"
                  />
                </div>
              )
            ) : (
              <Loader2
                className="m-auto animate-spin text-verbruik-72"
                size={48}
              />
            )}

            <div role="social media tags" className="my-4 flex flex-col gap-1">
              <div className="flex max-h-24 flex-1 flex-wrap gap-1 overflow-y-auto overflow-x-hidden">
                {buildingData?.hashtags && buildingData?.hashtags.length > 0 ? (
                  buildingData?.hashtags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-1 flex-col items-center justify-center">
                {/* <img src="/src/assets/QR.png" alt="QR code" className="w-2/5" /> */}
                <div className="flex items-center rounded bg-ondernemen-80 p-2">
                  <div className="relative  pr-2">
                    <p className="rounded bg-white p-1 text-center font-roboto text-sm">
                      Scan me!
                    </p>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2	 border-l-8 border-b-8 border-t-8 border-t-transparent border-b-transparent border-l-white"></div>
                  </div>
                  <QRcode className="h-20 w-20 rounded bg-white p-1" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="col-span-2 flex flex-col justify-between">
          <div className="mb-2 flex justify-between">
            <SectionTitle title="plattegrond" className="mb-0" />
            <ul className="flex gap-3">
              <li className="flex items-center rounded bg-verbruik-72 px-3 font-roboto text-sm text-white">
                <button onClick={() => setFilterByCategory('')}>All</button>
              </li>
              <li className="flex items-center rounded bg-productie-80 px-3 font-roboto text-sm text-white">
                <button onClick={() => setFilterByCategory('productie')}>
                  Productie
                </button>
              </li>
              <li className="flex items-center rounded bg-opslag-100 px-3 font-roboto text-sm text-white">
                <button onClick={() => setFilterByCategory('opslag')}>
                  Opslag
                </button>
              </li>
              <li className="flex items-center rounded bg-verbruik-100 px-3 font-roboto text-sm text-white">
                <button onClick={() => setFilterByCategory('verbruik')}>
                  Verbruik
                </button>
              </li>
            </ul>
          </div>

          <div className="flex h-full gap-1 rounded bg-white p-4">
            <div className="flex flex-1 items-center justify-center">
              <TransfoMap selectedBuilding={building} />
            </div>
            <div className="flex max-h-52 flex-1 flex-col divide-y-2 overflow-auto rounded border p-2 ">
              {buildingsData && buildingsData.length > 0 ? (
                filteredList.map(
                  (buildingData) =>
                    buildingData.id != building && (
                      <Link
                        to={`../${buildingData.id}/info`}
                        key={buildingData.id}
                      >
                        <button className="flex w-full items-center justify-between p-1">
                          <p className="font-roboto">{buildingData.naam}</p>
                          {buildingData.categorie ? (
                            <div
                              className={`h-4 w-4 rounded-full ${
                                buildingData.categorie &&
                                buildingData?.categorie[0].toLowerCase() ==
                                  'productie'
                                  ? 'bg-productie-80'
                                  : 'bg-' +
                                    buildingData?.categorie[0].toLowerCase() +
                                    '-100'
                              }`}
                            ></div>
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-gray-400"></div>
                          )}
                        </button>
                      </Link>
                    ),
                )
              ) : (
                <Loader2
                  className="m-auto animate-spin text-verbruik-72"
                  size={48}
                />
              )}
            </div>
          </div>
        </section>

        <section className="col-span-4">
          <Outlet />
        </section>
      </main>
    </Page>
  )
}
