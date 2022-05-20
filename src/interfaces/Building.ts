import { FieldSet } from "airtable"

interface profielfoto {
  url: string
}

export interface Gebouw extends FieldSet{
  naam: string
  categorie: string[]
  info: string
}
