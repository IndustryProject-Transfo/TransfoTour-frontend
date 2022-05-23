import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
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
} from 'chart.js'
import { Loader2 } from 'lucide-react'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export default () => {
  const { building } = useParams()
  const [buildingData, setBuildingData] = useBuilding(building!)
  const [influxData, setInfluxData] = useState([])
  const [isLoading, setLoading] = useState(true)

  function getData() {
    console.log(buildingData?.naam)

    if (buildingData) {
      get(
        `https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/${buildingData?.naam}/monthly`,
      )
        .then((data) => {
          setInfluxData(data.values['TotaalNet'])

          const influxData: any[] = []

          data.values['TotaalNet'].map((reading: any) => {
            influxData.push(reading.value)
          })
          setLoading(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  }

  const labels = influxData.map((reading: any) => {
    const d = new Date(reading.time)
    return d.toLocaleString(undefined, { dateStyle: 'short' })
  })

  // const test = {
  //   labels,
  //   datasets: buildingData!.categorie.map((categorie) => ({
  //     label: `${categorie}`,
  //     data: influxData.map((reading: any) => {
  //       return reading.value / 1000
  //     }),
  //     borderColor: 'rgb(255, 99, 132)',
  //     backgroundColor: 'rgba(255, 99, 132, 0.5)',
  //   })),
  // }

  const data = {
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

  return (
    <>
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader2 className="animate-spin text-algemeen-72" size={48}/>
        </div>
      ) : (
        <Line options={options} data={data} className={'max-h-80'} />
      )}
    </>
  )
}
