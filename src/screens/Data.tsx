import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useParams } from 'react-router-dom'
import { useBuilding } from '../hook/useBuilding'
import useRealtimePower from '../hook/useRealtimeBuilding'
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
import Card from '../components/Card'
import { BuildingData } from '../interfaces/BuildingData'

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
  const realtimePower = useRealtimePower(buildingData?.influx_naam)
  const [isLoading, setLoading] = useState(true)
  const [price, setPrice] = useState(0)
  const [tab, setTab] = useState<'uur' | 'dag' | 'maand'>('uur')
  const [buildingPower, setBuildingPower] = useState<
    BuildingData[] | undefined
  >()

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

  function getPrice() {
    get('https://api.airtable.com/v0/appS16VafPZAqBNVV/Prijs?').then((data) => {
      console.log(data.records[0].fields)
      Object.keys(data.records[0].fields).length > 0 &&
        setPrice(data.records[0].fields.huidig_energieprijs)
    })
  }

  function setChartByTab() {
    setLoading(true)
    setDataChart(emptyChart)
    const time = { uur: 'hourly', dag: 'daily', maand: 'monthly' }[tab]
    if (buildingData) {
      const API_URL = window['env']['API_INFLUX_URL']
      get(
        `${API_URL}/api/v1/transfo/power/usage/${buildingData?.influx_naam}/${time}?field=TotaalNet&calendarTime=false`,
      )
        .then((data) => {
          setBuildingPower(data.values['TotaalNet'] as BuildingData[])
          setDataChart({
            labels: data.values['TotaalNet'].map((reading: any) => {
              const d = new Date(reading.time)

              switch (tab) {
                case 'uur':
                  return `${d.toLocaleString('nl-NL', {
                    hour: 'numeric',
                    hour12: false,
                  })}u`
                case 'dag':
                  return `${d.toLocaleDateString('en-EN', {
                    day: '2-digit',
                  })}`
                case 'maand':
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
                  (reading: any) => reading.value,
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
            return value + ' kWh'
          },
          precision: 2,
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
            return context.formattedValue + ' kWh'
          },
        },
      },
    },
    locale: 'nl-NL',
  }

  useEffect(() => {
    setChartByTab()
  }, [buildingData, tab])

  useEffect(() => {
    getPrice()
  }, [])

  return (
    <>
      <div className="flex h-full gap-6">
        <div className="flex flex-auto flex-col">
          <SectionTitle title="Data" />
          <Card className="flex h-full flex-col justify-between">
            {buildingData ? (
              <ul role="tablist" className="flex">
                <button
                  className={`${
                    tab == 'uur'
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
                    setTab('uur')
                  }}
                >
                  Dag
                </button>
                <button
                  className={`${
                    tab == 'dag'
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
                    setTab('dag')
                  }}
                  disabled={isLoading}
                >
                  Maand
                </button>
                <button
                  className={`${
                    tab == 'maand'
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
                    setTab('maand')
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
          </Card>
        </div>

        <div className="flex flex-col">
          <SectionTitle title="Algemene Data" />
          <div className="grid h-full grid-rows-3 gap-6">
            <Card className="flex flex-col items-center justify-center">
              <p className="font-roboto text-xl">Huidig verbruik</p>
              <p className="font-roboto text-2xl text-gray-600">
                {realtimePower?.toLocaleString('NL-nl', {
                  maximumFractionDigits: 2,
                }) ?? '-'}{' '}
                kW
              </p>
            </Card>
            <Card className="flex flex-col items-center justify-center">
              <p className="font-roboto text-xl">Prijs {tab} verbruik</p>
              <p className="font-roboto text-2xl text-gray-600">
                €{' '}
                {((buildingPower?.at(-1)?.value ?? 0) * price).toLocaleString(
                  'NL-nl',
                  {
                    maximumFractionDigits: 2,
                  },
                ) ?? '-'}
              </p>
            </Card>
            <Card className="flex flex-col items-center justify-center">
              <p className="font-roboto text-xl">Totaal verbruik {tab}</p>
              <p className="font-roboto text-2xl text-gray-600">
                {buildingPower?.at(-1)?.value?.toLocaleString('NL-nl', {
                  maximumFractionDigits: 0,
                }) ?? '-'}{' '}
                kWh
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
