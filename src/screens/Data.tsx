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
    setLoading(true)
    setDataChart(emptyChart)
    const time = ['hourly', 'daily', 'monthly']
    console.log(buildingData?.influx_naam)
    if (buildingData) {
      get(
        `https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/${buildingData?.influx_naam}/${time[tab]}`,
      )
        .then((data) => {
          setDataChart({
            labels: data.values['TotaalNet'].map((reading: any) => {
              const d = new Date(reading.time)
              //TODO if tab day => getHour() else getDate() else getMonth()
              switch (tab) {
                case 0:
                  return `${d.getHours()}`
                case 1:
                  return `${d.getDate()}`
                case 2:
                  return months[d.getMonth()]
              }
            }),
            datasets: [
              {
                label: `${
                  buildingData.categorie
                    ? buildingData?.categorie[0]
                    : 'verbruik'
                }`,
                data: data.values['TotaalNet'].map(
                  (reading: any) => reading.value / 1000,
                ),

                backgroundColor: `${
                  buildingData?.categorie
                    ? buildingData?.categorie[0].toLowerCase() == 'productie'
                      ? 'rgba(160, 184, 91, 0.8)'
                      : buildingData?.categorie[0].toLowerCase() == 'opslag'
                      ? 'rgba(255, 203, 68, 0.8)'
                      : buildingData?.categorie[0].toLowerCase() == 'verbruik'
                      ? 'rgba(255, 97, 53, 0.8)'
                      : 'rgba(255, 99, 132, 0.5)'
                    : 'rgba(255, 99, 132, 0.5)'
                }`,
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
          <div className="flex h-full flex-col justify-between rounded bg-white p-4">
            {buildingData ? (
              <ul role="tablist" className="flex">
                <button
                  className={`${
                    tab == 0
                      ? `${
                          buildingData?.categorie
                            ? buildingData?.categorie[0].toLowerCase() ==
                              'productie'
                              ? 'bg-productie-80'
                              : 'bg-' +
                                buildingData?.categorie[0].toLowerCase() +
                                '-100'
                            : 'bg-verbruik-72'
                        } text-white`
                      : 'bg-none'
                  } mr-2 rounded px-6 py-1 font-roboto transition-colors`}
                  onClick={() => {
                    setTab(0)
                  }}
                >
                  Dag
                </button>
                <button
                  className={`${
                    tab == 1
                      ? `${
                          buildingData?.categorie
                            ? buildingData?.categorie[0].toLowerCase() ==
                              'productie'
                              ? 'bg-productie-80'
                              : 'bg-' +
                                buildingData?.categorie[0].toLowerCase() +
                                '-100'
                            : 'bg-verbruik-72'
                        } text-white`
                      : 'bg-none'
                  } mr-2 rounded px-6 py-1 font-roboto transition-colors`}
                  onClick={() => {
                    setTab(1)
                  }}
                  disabled={isLoading}
                >
                  Maand
                </button>
                <button
                  className={`${
                    tab == 2
                      ? `${
                          buildingData?.categorie
                            ? buildingData?.categorie[0].toLowerCase() ==
                              'productie'
                              ? 'bg-productie-80'
                              : 'bg-' +
                                buildingData?.categorie[0].toLowerCase() +
                                '-100'
                            : 'bg-verbruik-72'
                        } text-white`
                      : 'bg-none'
                  } mr-2 rounded px-6 py-1 font-roboto transition-colors`}
                  onClick={() => {
                    setTab(2)
                  }}
                  disabled={isLoading}
                >
                  Jaar
                </button>
              </ul>
            ) : (
              <></>
            )}

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
          <div className="grid h-full grid-rows-3 gap-6">
            <div className="flex flex-col items-center justify-center rounded bg-white px-8 ">
              <p className="font-roboto text-xl">Huidig Vermogen</p>
              <p className="font-roboto text-2xl text-gray-600">0 kW</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded bg-white px-8 ">
              <p className="font-roboto text-xl">Aantal euro bespaard</p>
              <p className="font-roboto text-2xl text-gray-600">0 kW</p>
            </div>
            <div className="flex flex-col items-center justify-center rounded bg-white px-8 ">
              <p className="font-roboto text-xl">Current Power</p>
              <p className="font-roboto text-2xl">0 kW</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
