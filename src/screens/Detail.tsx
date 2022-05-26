import { Loader2 } from 'lucide-react'
import { Outlet, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import SectionTitle from '../components/SectionTitle'
import Tag from '../components/Tag'
import { useBuilding } from '../hook/useBuilding'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  const tags = ['duiktank', 'transfo', 'energie-educatie']

  return (
    <Page>
      <Navbar title={buildingData?.naam} categorie="" />
      <main className="grid grid-flow-row grid-cols-4 grid-rows-cards gap-6 bg-base-100 py-6 px-16">
        <section className="col-span-2 flex flex-col justify-between">
          <SectionTitle title="gebouw" />
          <div className="grid h-full grid-cols-2 gap-4 overflow-hidden rounded bg-white pr-4">
            {buildingData ? (
              <img
                src={`${buildingData?.profielfoto[0].url}`}
                alt={`${buildingData?.naam}`}
                className="h-full object-cover"
              />
            ) : (
              <Loader2
                className="m-auto animate-spin text-algemeen-72"
                size={48}
              />
            )}

            <div role="social media tags" className="my-4 flex flex-col">
              <div className="flex flex-1 flex-wrap gap-1">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
              <div className="flex flex-1 items-center justify-center">
                <img src="/src/assets/QR.png" alt="" className="w-2/5" />
              </div>
            </div>
          </div>
        </section>

        <section className="col-span-2 flex flex-col justify-between">
          <div className="mb-2 flex justify-between">
            <SectionTitle title="plattegrond" className="mb-0" />
            <ul className="flex gap-3">
              <li className="rounded bg-algemeen-72 px-2 text-white">
                <button>All</button>
              </li>
              <li className="rounded bg-toerisme-80 px-2 text-white">
                <button>Productie</button>
              </li>
              <li className="rounded bg-evenementen-100 px-2 text-white">
                <button>Opslag</button>
              </li>
              <li className="rounded bg-erfgoed-100 px-2 text-white">
                <button>Verbruik</button>
              </li>
            </ul>
          </div>

          <div className="flex h-full gap-1 bg-white p-4">
            <div className="flex-1">Kaart</div>
            <div className="max-h-52 flex-1 divide-y-2 overflow-auto rounded border p-2 ">
              <div className="flex items-center justify-between p-1">
                <p>Duiktank</p>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </div>
              <div className="flex items-center justify-between p-1">
                <p>Duiktank</p>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </div>
              <div className="flex items-center justify-between p-1">
                <p>Duiktank</p>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </div>
              <div className="flex items-center justify-between p-1">
                <p>Duiktank</p>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </div>
              <div className="flex items-center justify-between p-1">
                <p>Duiktank</p>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </div>
              <div className="flex items-center justify-between p-1">
                <p>Duiktank</p>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </div>
              <div className="flex items-center justify-between p-1">
                <p>Duiktank</p>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </div>
              <div className="flex items-center justify-between p-1">
                <p>Duiktank</p>
                <div className="h-4 w-4 rounded-full bg-red-500"></div>
              </div>
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
