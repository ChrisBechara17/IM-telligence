import { useEffect, useState } from 'react'
import { api } from './api.js'

// Generic data hook: pass a function that returns a promise.
function useAsync(fn, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null })
  useEffect(() => {
    let alive = true
    setState((s) => ({ ...s, loading: true, error: null }))
    fn()
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: null, loading: false, error }))
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return state
}

export function useEvents(params = {}) {
  const key = JSON.stringify(params)
  return useAsync(() => api.getEvents(params), [key])
}

export function useTestimonials() {
  return useAsync(() => api.getTestimonials(), [])
}

export function useSchools() {
  return useAsync(() => api.getSchools(), [])
}
