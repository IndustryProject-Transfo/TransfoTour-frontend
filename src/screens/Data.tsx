import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { useBuilding } from '../hook/useBuilding'
import { get } from '../utils/data-acces'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ChartData,
  ChartOptions,
  Tick,
} from 'chart.js'
import { Loader2 } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

export default () => {
  const { building } = useParams()
  const [buildingData] = useBuilding(building!)
  const [influxData, setInfluxData] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [tab, setTab] = useState(0)
  const [dataChart, setDataChart] = useState<ChartData>()

  function getData() {
    if (buildingData) {
      get(
        `https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/${buildingData?.naam}/daily`,
      )
        .then((data) => {
          setInfluxData(data.values['TotaalNet'])

          const influxData: any[] = []

          data.values['TotaalNet'].map((reading: any) => {
            influxData.push(reading.value)
          })

          switch (tab) {
            case 1:
              break
            case 2:
              break
            default:
              break
          }
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: function (value: string | number) {
            return value + ' kW'
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.formattedValue + ' kW'
          },
        },
      },
    },
  }

  const labels = influxData.map((reading: any) => {
    const d = new Date(reading.time)
    return `${d.getDate()}`
  })

  const data2 = {
    labels,
    datasets: [
      {
        label: `${buildingData?.categorie}`,
        data: influxData.map((reading: any) => reading.value / 1000),

        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  useEffect(getData, [buildingData])

  useEffect(() => {
    console.log('Test')
  }, [tab])

  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="animate-spin text-algemeen-72" size={48} />
        </div>
      ) : (
        <div className="grid h-full grid-cols-data">
          <div className="flex flex-col justify-between">
            <ul role="tablist" className="flex">
              <button
                className={`${
                  tab == 0 ? 'bg-red-700 text-white' : 'bg-none'
                } mr-2 rounded px-6 py-1 font-roboto`}
                onClick={() => {
                  setTab(0)
                }}
              >
                Dag
              </button>
              <button
                className={`${
                  tab == 1 ? 'bg-red-700 text-white' : 'bg-none'
                } mr-2 rounded px-6 py-1 font-roboto`}
                onClick={() => {
                  setTab(1)
                }}
              >
                Maand
              </button>
              <button
                className={`${
                  tab == 2 ? 'bg-red-700 text-white' : 'bg-none'
                } mr-2 rounded px-6 py-1 font-roboto`}
                onClick={() => {
                  setTab(2)
                }}
              >
                Jaar
              </button>
            </ul>

            <Bar options={options} data={data2} className={'max-h-64'} />
          </div>

          <div className="flex flex-col justify-around">
            <div className="flex flex-col items-center">
              <p>Huidig Vermogen</p>
              <p>40Kw</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Aantal euro bespaard</p>
              <p>40Kw</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Current Power</p>
              <p>40Kw</p>
            </div>
            <div className="flex flex-col items-center">
              <p>Current Power</p>
              <p>40Kw</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
