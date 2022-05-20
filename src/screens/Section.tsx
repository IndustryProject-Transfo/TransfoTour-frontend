import { useParams } from 'react-router-dom'

export default () => {
  const { section } = useParams()
  return <div>{section}</div>
}
