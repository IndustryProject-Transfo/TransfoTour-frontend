import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import { useBuilding } from '../hook/useBuilding'
import { Gebouw } from '../interfaces/Building'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)

  return (
    <Page>
      <Navbar title={buildingData?.naam} categorie="" />
      <main className="grid grid-flow-row grid-cols-3 grid-rows-cards gap-6 bg-base-100 py-6 px-16">
        <div className="flex max-h-80 flex-col items-center justify-evenly bg-white p-8">
          {!buildingData ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="animate-spin text-algemeen-72" size={48} />
            </div>
          ) : (
            <>
              <img
                src={`${buildingData?.profielfoto[0].url}`}
                alt={`${buildingData?.naam}`}
              />
              <h1 className="font-bold">
                {buildingData?.categorie.join(' - ')}
              </h1>
            </>
          )}
        </div>
        <div className="col-span-2 flex max-h-80 bg-white p-8">
          <div>Kaart</div>
          <div>Gebouwen</div>
        </div>
        <div className="col-span-3 max-h-96 overflow-auto bg-white p-8">
          <Outlet />
        </div>
      </main>
    </Page>
  )
}
