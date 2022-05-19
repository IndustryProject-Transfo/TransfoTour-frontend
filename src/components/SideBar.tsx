import { Building, Map } from 'lucide-react'

export const Sidebar = () => {
  return (
    <aside className="absolute flex h-full w-12 flex-col content-center bg-Algemeen-80">
      <div className="mb-3 h-12 w-12 bg-Erfgoed-53">
        <img src="./src/assets/Transfo_logo.png" className="  p-2.5 "></img>
      </div>
      <div
        className=" flex h-12 w-12 items-center justify-center "
        onClick={() => console.log('Going to Map')}
      >
        <Map size={32} color="white" className="" />
      </div>
      <div
        className="flex h-12 w-12 items-center justify-center"
        onClick={() => console.log('Going to building')}
      >
        <Building size={32} color="white" className="" />
      </div>
    </aside>
  )
}
