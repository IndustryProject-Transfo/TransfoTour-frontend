import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Page from '../components/Page'

export default () => {
  return (
    <Page>
      <Navbar categorie="" />
      <main className="h-full bg-base-100 py-6 px-16">
        <h1>Map</h1>
        <Link to={'buildings/recD7zWgqcWaHKsyh/info'}>
          Go to Detail
        </Link>
      </main>
    </Page>
  )
}
