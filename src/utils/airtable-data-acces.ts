import Airtable, { FieldSet } from 'airtable'

const { VITE_APP_BASE, VITE_APP_KEY } = import.meta.env

export const getAirtable = async (table: string, record?: string) => {
  let base = new Airtable({ apiKey: `${VITE_APP_KEY}` }).base(
    `${VITE_APP_BASE}`,
  )

  //retrieve record from table
  base(table).find('recD7zWgqcWaHKsyh', function (err, record) {
    if (err) {
      console.error(err)
      return
    }

    console.log(record?.fields)

    return record?.fields
    //setBuilding(record?.fields)
  })

  /* retrieve records from the base matching a name */
  // base('New Playlists')
  //   .select({
  //     filterByFormula: `{ID} = "${name}"`,
  //   })
  //   .eachPage(
  //     function page(records, fetchNextPage) {
  //       records.forEach(function (record) {
  //         console.log('Retrieved', record.get('ID'))
  //         console.dir(record) // show full record JS object
  //       })
  //       fetchNextPage()
  //     },
  //     function done(err) {
  //       if (err) {
  //         console.error(err)
  //         return
  //       }
  //     },
  //   )
}
