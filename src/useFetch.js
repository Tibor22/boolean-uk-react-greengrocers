import { useState, useEffect } from 'react'

export const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  useEffect(async () => {
    setIsPending(true)
    const controller = new AbortController()
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'fit-life-food.p.rapidapi.com',
          'X-RapidAPI-Key': 'd8c04156d8mshf1a6a9a0deaf3acp1d8277jsneb8ffe63f7f3'
        },
        signal: controller.signal
      })
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const data = await res.json()

      setIsPending(false)
      setData(data)
      setError(null)
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('the fetch was aborted')
      } else {
        setIsPending(false)
        setError('Could not fetch the data')
      }
    }
    return () => {
      controller.abort()
    }
  }, [url, method])

  return { data, isPending, error }
}
