import { Gebouw } from '../interfaces/Building'
import { capitalizeFirstLetter } from './capitalizeFirstLetter'

export const getFilteredList = (buildingsData: Gebouw[], filter: string) => {
  buildingsData.sort((a, b) => (a.volgorde > b.volgorde ? 1 : -1))

  if (!filter) {
    return buildingsData
  }

  return buildingsData!.filter((item) => {
    if (item.categorie)
      return item.categorie.includes(capitalizeFirstLetter(filter))
  })
}
