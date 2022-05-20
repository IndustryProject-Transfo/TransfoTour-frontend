import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { get } from '../utils/data-acces'

export default () => {
  const { building } = useParams()
  function getData() {
    const data = get(
      'https://enm1-flask.azurewebsites.net/api/v1/transfo/power/usage/Duiktank/daily?field=TotaalNet&fn=mean',
    )

    //console.log('Data', data)
  }

  useEffect(getData), []
  return <>Data van {building}</>
}
