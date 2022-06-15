import { X } from 'lucide-react'

import MCT from '../assets/about/Howest-MCT.png'
import EM from '../assets/about/Howest-EM.png'
import Transfo from '../assets/about/Transfo.png'
import Empowered from '../assets/about/Empowered.png'
import { ReactComponent as Lightning } from '../assets/svg/Transfo_Logo.svg'
import { ReactComponent as QRcode } from '../assets/about/QRcode_OverOns.svg'

function AboutModal({
  show,
  onChange,
}: {
  show: boolean
  onChange: (show: boolean) => void
}) {
  if (!show) {
    return null
  }
  return (
    <>
      <div className="fixed inset-0 z-20 bg-black opacity-25"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-auto max-w-xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-4">
              <h3 className="text-2xl font-semibold">About</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent  p-1 text-3xl font-semibold leading-none outline-none focus:outline-none"
                onClick={() => onChange(false)}
              >
                <X className="fill-black" color="#6b7280" />
              </button>
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <div className="flex flex-col items-center justify-center">
                <div className="mb-8 flex w-full flex-row items-center justify-center gap-10">
                  <img
                    src={MCT}
                    alt="Howest MCT logo"
                    className="h-auto w-[30%]"
                  />
                  <img
                    src={EM}
                    alt="Howest Energie Management logo"
                    className="h-auto w-[30%]"
                  />
                </div>
                <div className="flex w-full flex-row items-center justify-center gap-10">
                  <img
                    src={Empowered}
                    alt="Empowered logo"
                    className="h-auto w-[30%]"
                  />
                  <img
                    src={Transfo}
                    alt="Transfo logo"
                    className="h-auto w-[30%]"
                  />
                </div>
                <h1 className="mb-2 font-roboto text-xl font-bold text-gray-500">
                  Gemaakt door:
                </h1>
                <QRcode className="h-auto w-[30%]" />
                <ul className="mt-2 inline-flex w-full items-center justify-center gap-2">
                  <li className="font-roboto">Aaron Carton</li>
                  <li>
                    <Lightning className="h-10 w-5 rotate-90" />
                  </li>
                  <li className="font-roboto">Carmino Deschuijmere</li>
                  <li>
                    <Lightning className="h-10 w-5 rotate-90" />
                  </li>
                  <li className="font-roboto">Merijn Defoort</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutModal
