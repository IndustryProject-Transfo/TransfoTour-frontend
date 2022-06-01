import { useEffect, useState } from 'react'
import { Gebouw } from '../interfaces/Building'
import { get } from '../utils/data-acces'

export const useFacts = (buildingData: Gebouw) => {
  const [facts, setFacts] = useState<string[]>([])

  async function setQuerystring() {
    if (buildingData?.weetjes && buildingData.weetjes.length > 0) {
      let querystring = '?filterByFormula=OR('

      for (let i = 0; i < buildingData.weetjes.length; i++) {
        const element = buildingData.weetjes[i]
        querystring += `{id}='${element}',`

        if (i === buildingData.weetjes.length - 1) {
          querystring += `{id}='${element}')`
        }
      }

      return querystring
    }
  }

  async function getFacts() {
    const querystring = await setQuerystring()
 
    if (querystring) {
      get(`https://api.airtable.com/v0/appS16VafPZAqBNVV/weetjes${querystring}`)
        .then((data) => {
          //console.log('Succes:', data)
          const tempArray: string[] = []

          data.records.forEach((record: { fields: any }) => {
            tempArray.push(record.fields.weetje)
          })

          setFacts(tempArray)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    } else {
      setFacts([])
    }
  }

  useEffect(() => {
    getFacts()
  }, [buildingData])

  console.log(facts)
  return [facts]
}
