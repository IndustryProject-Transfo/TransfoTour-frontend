import { useEffect, useState } from 'react'

function useRealtimePower(influx_building: string | undefined) {
  const [realtimePower, setRealtimePower] = useState<number>()

  useEffect(() => {
    const fetchRealtimeData = () => {
      const API_URL = window['env']['API_INFLUX_URL']
      if (influx_building) {
        fetch(
          `${API_URL}/api/v1/transfo/power/usage/${influx_building}/realtime?field=TotaalNet`,
        )
          .then((res) => res.json())
          .then((data) => {
            let buildingPower = data['values']['TotaalNet'].at(-1)?.value
            setRealtimePower(buildingPower)
          })
      }
    }

    // start fetching realtime data, repeat every 6 seconds
    fetchRealtimeData()
    const realtimeInterval = setInterval(fetchRealtimeData, 1000 * 6)

    return () => clearInterval(realtimeInterval)
  }, [influx_building])

  return realtimePower
}

export default useRealtimePower
