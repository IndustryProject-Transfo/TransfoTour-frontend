export const get = async (url: string) => {
  const { VITE_APP_KEY } = import.meta.env

  return await fetch(url, {
    headers: {
      Authorization: 'Bearer ' + VITE_APP_KEY,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}
