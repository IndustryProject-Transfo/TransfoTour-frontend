import { FieldSet } from 'airtable'

interface profielfoto {
  url: string
}

export interface Gebouw {
  id: string
  naam: string
  influx_naam: string
  categorie: string[]
  profielfoto: profielfoto[]
  info: string
  volgorde: number
  quiz: string[]
  weetjes: string[]
  hashtags: string[]
}
