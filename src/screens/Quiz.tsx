import { CheckCircle2, Flag, Loader2, XCircle, Zap } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useBuilding } from '../hook/useBuilding'
import { Quiz } from '../interfaces/Quiz'
import { get } from '../utils/data-acces'

import SectionTitle from '../components/SectionTitle'

import { ReactComponent as TransfoLogo } from '/src/assets/svg/TransfoLogo.svg'

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  const [isLoading, setLoading] = useState(true)
  const [hideAnswer, SetHideAnswer] = useState<boolean>(true)
  const [progressQuiz, setProgressQuiz] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [showScore, setShowScore] = useState(false)

  const [quiz, setQuiz] = useState<Quiz>()

  const quizStyling = [
    { letter: 'A', color: 'bg-erfgoed-100' },
    { letter: 'B', color: 'bg-ondernemen-80' },
    { letter: 'C', color: 'bg-opslag-100' },
    { letter: 'D', color: 'bg-productie-80' },
  ]

  function getQuizRecord() {
    if (buildingData?.quiz) {
      get(
        `https://api.airtable.com/v0/appS16VafPZAqBNVV/Quiz/${buildingData?.quiz[progressQuiz]}`,
      )
        .then((data) => {
          let opties: string[] = []

          opties.push(data.fields.optie1)
          opties.push(data.fields.optie2)
          opties.push(data.fields.optie3)
          opties.push(data.fields.optie4)

          setQuiz({
            vraag: data.fields.vraag,
            opties: opties,
            antwoord: data.fields.antwoord,
          })
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function checkAnswer(i: number) {
    if (quiz?.opties[i].toLowerCase() == quiz?.antwoord.toLowerCase()) {
      setScore(score + 1)
    }

    SetHideAnswer(false)
  }

  useEffect(() => getQuizRecord(), [buildingData, progressQuiz])

  return (
    <>
      <div className="flex h-full flex-col">
        <SectionTitle title="Quiz" />
        <div className="flex flex-auto gap-6">
          <div className="flex w-80 flex-col items-center justify-center rounded bg-white p-4 text-center font-roboto text-2xl">
            <TransfoLogo className="st0 block w-24 fill-red-600" />
            <h1>Transfo Zwevegem</h1>
          </div>

          <div className=" flex-1 rounded bg-white p-4">
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin text-verbruik-72" size={48} />
              </div>
            ) : (
              <>
                <div
                  className={`${
                    !showScore ? 'flex flex-col justify-between' : 'hidden'
                  } h-full `}
                >
                  <h1 className="max-h-24 overflow-auto font-roboto	text-lg">
                    {quiz?.vraag}
                  </h1>
                  <div className="flex-start flex flex-col gap-3">
                    {quiz?.opties.map(
                      (optie, i) =>
                        optie && (
                          <button
                            key={i}
                            className="flex items-center overflow-hidden rounded-md border"
                            onClick={() => {
                              checkAnswer(i)
                            }}
                          >
                            <div
                              className={`${quizStyling[i].color} mr-6 px-3 py-1 font-roboto text-3xl text-white`}
                            >
                              {quizStyling[i].letter}
                            </div>
                            <div className="mr-6 flex w-full justify-between">
                              <p className="font-roboto">{optie}</p>
                              <div
                                className={`${
                                  hideAnswer ? 'opacity-0' : 'opacity-100'
                                } transition ease-in`}
                              >
                                {optie.toLowerCase() ==
                                quiz?.antwoord.toLowerCase() ? (
                                  <CheckCircle2 className="text-green-600" />
                                ) : (
                                  <XCircle className="text-red-600" />
                                )}
                              </div>
                            </div>
                          </button>
                        ),
                    )}
                  </div>
                  <div className="flex items-center gap-24">
                    <div className="h-3 flex-auto overflow-hidden rounded-xl bg-gray-100">
                      <div
                        className={`h-full ${
                          buildingData?.categorie
                            ? buildingData?.categorie[0].toLowerCase() ==
                              'productie'
                              ? 'bg-productie-80'
                              : 'bg-' +
                                buildingData?.categorie[0].toLowerCase() +
                                '-100'
                            : 'bg-verbruik-72'
                        }`}
                        style={{
                          width: `${
                            progressQuiz == 3 ? 100 : (progressQuiz + 1) * 25
                          }%`,
                        }}
                      ></div>
                    </div>
                    <button
                      className="rounded bg-verbruik-72 p-2 px-4 font-roboto text-white transition-colors disabled:bg-gray-500"
                      onClick={() => {
                        if (progressQuiz <= 2) setProgressQuiz(progressQuiz + 1)
                        SetHideAnswer(true)
                        if (progressQuiz == 3) setShowScore(true)
                      }}
                      disabled={hideAnswer}
                    >
                      volgende
                    </button>
                  </div>
                </div>
                <div
                  className={`${
                    showScore ? 'flex flex-col' : 'hidden'
                  } h-full items-center justify-center`}
                >
                  <Confetti recycle={false} run={showScore} />
                  <h1 className="mb-3 font-roboto text-xl">
                    {score > 1
                      ? 'Gefeliciteerd, je behaalde een score van:'
                      : 'Je behaalde een score van:'}
                  </h1>
                  <div className="h-32 w-32">
                    <svg viewBox="0 0 42 42">
                      <circle
                        cx="21"
                        cy="21"
                        r={15.91549430918954}
                        fill="transparent"
                        stroke="rgba(200,200,200,0.5)"
                        strokeWidth={3}
                      />
                      <text
                        x="50%"
                        y="50%"
                        textAnchor="middle"
                        dy=".3em"
                        className="font-roboto text-xs"
                      >
                        {score}/4
                      </text>
                      <circle
                        className="stroke-verbruik-72	"
                        cx="21"
                        cy="21"
                        r={15.91549430918954}
                        fill="transparent"
                        strokeWidth={3}
                        strokeDasharray={`100 ${100 - score * 25}`}
                        strokeDashoffset={100}
                        strokeLinecap="round"
                        transform="rotate(-90, 21,21)"
                      />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
