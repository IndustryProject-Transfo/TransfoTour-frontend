import { useEffect, useState } from 'react'
import { Gebouw } from '../interfaces/Building'
import { get } from '../utils/data-acces'

export const useBuilding = (buildingId: string) => {
  const [buildingData, setBuildingData] = useState<Gebouw>()

  useEffect(() => {
    get(`https://api.airtable.com/v0/appS16VafPZAqBNVV/Gebouwen/${buildingId}`)
      .then((data) => {
        //console.log('Succes:', data)
        setBuildingData(data.fields)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [buildingId])

  return [buildingData]
}
