import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { useBuilding } from '../hook/useBuilding'
import { Quiz } from "../interfaces/Quiz"
import { get } from '../utils/data-acces'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  const [isLoading, setLoading] = useState(true)
  const [progressQuiz, setProgressQuiz] = useState<number>(1)
  const [quiz, setQuiz] = useState<Quiz>()

  function getData() {
    if (buildingData) {
      buildingData?.quiz.forEach((record) => {
        console.log(record)
        get(`https://api.airtable.com/v0/appS16VafPZAqBNVV/Quiz/${record}`)
          .then((data) => {
            console.log(data.fields)
            setQuiz(data.fields)
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
        <>
          <div className="flex h-full flex-col">
            <SectionTitle title="Quiz" />
            <div className="flex flex-auto gap-6">
              <div className="flex max-w-xs items-center rounded bg-white p-4 text-center font-roboto text-3xl">
                {quiz?.vraag}
              </div>
              <div className="flex flex-1 flex-col justify-between rounded bg-white p-4">
                <div className="h-4 overflow-hidden rounded-xl bg-gray-100">
                  <div
                    className={`h-full w-${progressQuiz}/4 bg-red-600`}
                  ></div>
                </div>
                <div className="flex-start flex flex-col">
                  <button>a</button>
                  <button>a</button>
                  <button>a</button>
                  <button>a</button>
                </div>
                <div className="flex justify-end">
                  <button className="rounded bg-algemeen-72 p-2 px-4 text-white font-roboto">
                    volgende
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
