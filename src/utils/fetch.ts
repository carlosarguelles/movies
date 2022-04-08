import { ref } from 'vue'

export function useFetch<T>(url: string) {
  const data = ref<T>()
  const error = ref()

  fetch(import.meta.env.VITE_API_URL + url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(json => (data.value = json))
    .catch(err => (error.value = err))

  return { data, error }
}
