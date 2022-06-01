import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SectionTitle from '../components/SectionTitle'
import { useBuilding } from '../hook/useBuilding'
import { Quiz } from '../interfaces/Quiz'
import { get } from '../utils/data-acces'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  const [isLoading, setLoading] = useState(true)
  const [progressQuiz, setProgressQuiz] = useState<number>(1)
  const [quiz, setQuiz] = useState<Quiz>()
  const quizStyling = [
    { letter: 'A', color: 'bg-erfgoed-100' },
    { letter: 'B', color: 'bg-ondernemen-80' },
    { letter: 'C', color: 'bg-opslag-100' },
    { letter: 'D', color: 'bg-productie-80' },
  ]

  function getData() {
    if (buildingData?.quiz) {
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

  useEffect(() => getData(), [buildingData])

  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="animate-spin text-verbruik-72" size={48} />
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
                    className={`h-full w-${progressQuiz}/4 bg-erfgoed-100`}
                  ></div>
                </div>
                <div className="flex-start flex flex-col gap-3">
                  <button className="flex items-center overflow-hidden rounded-md border">
                    <div
                      className={`${quizStyling[0].color} mr-6 px-3 py-1 text-3xl text-white`}
                    >
                      {quizStyling[0].letter}
                    </div>
                    <p>Een mogelijk antwoord op de vraag met energie</p>
                  </button>
                  <button className="flex items-center overflow-hidden rounded-md border">
                    <div
                      className={`${quizStyling[1].color} mr-6 px-3 py-1 text-3xl text-white`}
                    >
                      {quizStyling[1].letter}
                    </div>
                    <p>Een mogelijk antwoord op de vraag met energie</p>
                  </button>
                  <button className="flex items-center overflow-hidden rounded-md border">
                    <div
                      className={`${quizStyling[2].color} mr-6 px-3 py-1 text-3xl text-white`}
                    >
                      {quizStyling[2].letter}
                    </div>
                    <p>Een mogelijk antwoord op de vraag met energie</p>
                  </button>
                  <button className="flex items-center overflow-hidden rounded-md border">
                    <div
                      className={`${quizStyling[3].color} mr-6 px-3 py-1 text-3xl text-white`}
                    >
                      {quizStyling[3].letter}
                    </div>
                    <p>Een mogelijk antwoord op de vraag met energie</p>
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    className="rounded bg-verbruik-72 p-2 px-4 font-roboto text-white"
                    disabled
                  >
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
