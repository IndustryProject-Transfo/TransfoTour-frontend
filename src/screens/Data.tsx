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
} from 'chart.js'
import { Loader2 } from 'lucide-react'
import SectionTitle from '../components/SectionTitle'

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
  const [isLoading, setLoading] = useState(true)
  const [tab, setTab] = useState(0)
  const emptyChart = {
    labels: [],
    datasets: [],
  }

  const months = [
    'Januari',
    'Februari',
    'Maart',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Augustus',
    'September',
    'October',
    'November',
    'December',
  ]

  const [dataChart, setDataChart] = useState<ChartData<'bar'>>(emptyChart)

  function setChartByTab() {
    //set time by tab
    setLoading(true)
    //setDataChart(emptyChart)
    const time = ['daily', 'daily', 'monthly']
    console.log(dataChart)
    //check if buildingData is loaded
    if (buildingData) {
      get(
        `https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/${buildingData?.naam}/${time[tab]}`,
      )
        .then((data) => {
          setDataChart({
            labels: data.values['TotaalNet'].map((reading: any) => {
              const d = new Date(reading.time)
              //TODO if tab day => getHour() else getDate() else getMonth()
              switch (tab) {
                case 0:
                  return `${d.getDate()}`
                case 1:
                  return `${d.getDate()}`
                case 2:
                  return months[d.getMonth()]
              }
            }),
            datasets: [
              //TODO foreach categorie create data object
              {
                label: `${buildingData?.categorie}`,
                data: data.values['TotaalNet'].map(
                  (reading: any) => reading.value / 1000,
                ),

                //TODO set color by categorie
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
            ],
          })

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

  useEffect(() => {
    setChartByTab()
  }, [buildingData, tab])

  return (
    <>
      <div className="flex h-full gap-6">
        <div className="flex flex-auto flex-col">
          <SectionTitle title="Data" />
          <div className="flex h-full flex-col justify-between bg-white p-4">
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
                disabled={isLoading}
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
                disabled={isLoading}
              >
                Jaar
              </button>
            </ul>
            {isLoading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="animate-spin text-verbruik-72" size={48} />
              </div>
            ) : (
              <Bar
                options={options}
                data={dataChart}
                className={'max-h-72 px-4'}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <SectionTitle title="Algemene Data" />
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col items-center rounded bg-white px-8 py-4">
              <p className="font-roboto text-xl">Huidig Vermogen</p>
              <p className="font-roboto text-2xl">0Kw</p>
            </div>
            <div className="flex flex-col items-center rounded bg-white px-8 py-4">
              <p className="font-roboto">Aantal euro bespaard</p>
              <p className="font-roboto text-2xl">0Kw</p>
            </div>
            <div className="flex flex-col items-center rounded bg-white px-8 py-4">
              <p className="font-roboto">Current Power</p>
              <p className="font-roboto text-2xl">0Kw</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
