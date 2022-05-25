import { FieldSet } from 'airtable'

interface profielfoto {
  url: string
}

export interface Gebouw {
  naam: string
  categorie: string[]
  info: string
  profielfoto: profielfoto[]
  quiz: string[]
}
