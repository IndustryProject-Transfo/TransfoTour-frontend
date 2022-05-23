export const get = (url: string) => {
  const { VITE_APP_KEY } = import.meta.env

  return fetch(url, {
    headers: {
      Authorization: 'Bearer ' + VITE_APP_KEY,
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
}
