export const get = async (url: string) => {
  const AIR_TABLE_KEY = window['env']['AIRTABLE_KEY']

  return await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + AIR_TABLE_KEY,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}
