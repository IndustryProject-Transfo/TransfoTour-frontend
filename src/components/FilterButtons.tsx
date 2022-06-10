export default ({
  setFilter,
  className,
}: {
  setFilter: Function
  className?: string
}) => {
  return (
    <ul className={`flex gap-3 ${className ? className : ''}`}>
      <li>
        <button
          className="rounded bg-verbruik-72 px-3 py-1 font-roboto text-sm text-white"
          onClick={() => setFilter('')}
        >
          All
        </button>
      </li>
      <li>
        <button
          className="rounded bg-productie-80 px-3 py-1 font-roboto text-sm text-white"
          onClick={() => setFilter('productie')}
        >
          Productie
        </button>
      </li>
      <li>
        <button
          className="rounded bg-opslag-100 px-3 py-1 font-roboto text-sm text-white"
          onClick={() => setFilter('opslag')}
        >
          Opslag
        </button>
      </li>
      <li>
        <button
          className="rounded bg-verbruik-100 px-3 py-1 font-roboto text-sm text-white"
          onClick={() => setFilter('verbruik')}
        >
          Verbruik
        </button>
      </li>
    </ul>
  )
}
