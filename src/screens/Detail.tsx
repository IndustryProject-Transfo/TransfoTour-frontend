import { useEffect, useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import { Gebouw } from "../interfaces/Building"

export default () => {
  const [buildingData, setBuildingData] = useState<Gebouw>()
  const { VITE_APP_KEY } = import.meta.env

  const { building } = useParams()

  useEffect(() => {
    //const data = getAirtable('Gebouwen', building)
    fetch(
      'https://api.airtable.com/v0/appS16VafPZAqBNVV/Gebouwen/recD7zWgqcWaHKsyh',
      {
        headers: {
          Authorization: 'Bearer ' + VITE_APP_KEY,
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((data) => setBuildingData(data.fields))
      .catch((error) => {
        console.error('Error:', error)
      })
    //setBuildingData(data!)
  }, [])

  console.log(buildingData)

  return (
    <Page>
      <Navbar title={building} categorie="" />
      <main className="grid grid-flow-row grid-cols-3 grid-rows-cards gap-6 bg-base-100 py-6 px-16">
        <div className="flex max-h-80 flex-col items-center justify-evenly bg-white p-8">
          {/* {building && (
            <img
              src={`${buildingData?.profielfoto[0].url}`}
              alt={`${buildingData?.naam}`}
            />
          )} */}
          {/* <h1>{buildingData?.categorie.join(' - ')}</h1> */}
        </div>
        <div className="col-span-2 max-h-80 bg-white p-8">hello</div>
        <div className="col-span-3 bg-white p-8">
          <Outlet />
        </div>
      </main>
    </Page>
  )
}
