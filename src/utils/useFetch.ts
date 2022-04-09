import { isRef, ref, Ref, watchEffect } from 'vue'

export function useFetch<T>(url: string, params?: Ref<Record<string, any>>) {
  const data = ref<T | null>()
  const error = ref()

  function doFetch() {
    data.value = null
    error.value = null

    let reqUrl = import.meta.env.VITE_API_URL + url

    if (params) {
      reqUrl += '?' + new URLSearchParams(params.value).toString()
    }

    fetch(reqUrl, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => (data.value = json))
      .catch(err => (error.value = err))
  }

  if (isRef(params)) {
    watchEffect(doFetch)
  } else {
    doFetch()
  }

  return { data, error }
}
