import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useBuilding } from '../hook/useBuilding'
import { get } from '../utils/data-acces'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  const [isLoading, setLoading] = useState(true)
  const [progressQuiz, setProgressQuiz] = useState<number>(1)
  const [quiz, setQuiz] = useState([])

  function getData() {
    if (buildingData) {
      buildingData?.quiz.forEach((record) => {
        console.log(record)
        get(`https://api.airtable.com/v0/appS16VafPZAqBNVV/Quiz/${record}`)
          .then((data) => {
            console.log(data)
            setLoading(false)
          })
          .catch((err) => {
            console.log(err)
          })
      })
    }
  }

  useEffect(getData, [buildingData])

  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="animate-spin text-algemeen-72" size={48} />
        </div>
      ) : (
        <>Quiz</>
      )}
    </>
  )
}
