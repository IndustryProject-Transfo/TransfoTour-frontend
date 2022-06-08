import { FieldSet } from 'airtable'

interface profielfoto {
  url: string
}

export interface Gebouw {
  id: string
  naam: string
  influx_naam: string
  building_id: number
  categorie: string[]
  profielfoto: profielfoto[]
  info: string
  volgorde: number
  quiz: string[]
  weetjes: string[]
  hashtags: string[]
}
