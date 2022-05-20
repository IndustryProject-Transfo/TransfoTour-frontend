import { Database, FileText, Info, Map } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'
import Logo from './Logo'

export default ({
  title = 'Transfo',
  categorie = '',
}: {
  title?: string
  categorie?: string
}) => {
  return (
    <nav className=" grid grid-cols-layout">
      <Logo />
      <div className="relative flex flex-1 items-center">
        <h1
          className={`ml-4 font-roboto text-3xl font-bold ${
            categorie.toLowerCase() == 'productie'
              ? 'text-green-600'
              : categorie.toLowerCase() == 'opslag'
              ? 'text-orange-600'
              : categorie.toLowerCase() == 'verbruik'
              ? 'text-red-600'
              : 'text-algemeen-72'
          }`}
        >
          {capitalizeFirstLetter(title)}
        </h1>
        {title != 'Transfo' ? (
          <ul className="absolute left-2/4 right-2/4 flex h-16 justify-center gap-12">
            <li>
              <NavLink
                to={`info`}
                className={({ isActive }) =>
                  'flex h-full w-16 flex-col items-center justify-center font-roboto ' +
                  (isActive ? 'border-b-4 border-algemeen-72' : undefined)
                }
              >
                <Info size={20} />
                Info
                {/* <button className="flex h-full flex-col items-center justify-center border-b-4 border-algemeen-72 px-6 font-roboto">
                <Info size={20} />
                Info
              </button> */}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`data`}
                className={({ isActive }) =>
                  'flex h-full w-16 flex-col items-center justify-center font-roboto ' +
                  (isActive ? 'border-b-4 border-algemeen-72' : undefined)
                }
              >
                <Database size={20} />
                Data
                {/* <button className="flex h-full flex-col items-center justify-center border-b-2 border-gray-400 px-6 font-roboto">
                <Database size={20} />
                Data
              </button> */}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`quiz`}
                className={({ isActive }) =>
                  'flex h-full w-16 flex-col items-center justify-center font-roboto ' +
                  (isActive ? 'border-b-4 border-algemeen-72' : '')
                }
              >
                <FileText size={20} />
                Quiz
                {/* <button className="flex h-full flex-col items-center justify-center border-b-2 border-gray-400 px-6 font-roboto">
                <FileText size={20} />
                Quiz
              </button> */}
              </NavLink>
            </li>
          </ul>
        ) : (
          ''
        )}
      </div>
      <button className="flex items-center justify-center">
        <Link to={'/'}>
          <Map size={40} />
        </Link>
      </button>
    </nav>
  )
}
