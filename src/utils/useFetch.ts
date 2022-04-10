import { isRef, ref, Ref, watchEffect } from 'vue'

// useFetch: This function is based in Vue 3 Composables.
// https://vuejs.org/guide/reusability/composables.html
// It takes an URL, and a record of URL params. The last one (optional) will be
// an stateful variable. Returns an object with data, and an error (if there is
// when fetching).
export function useFetch<T>(url: string, params?: Ref<Record<string, any>>) {
  const data = ref<T | null>()
  const error = ref()

  // doFetch function.
  function doFetch() {
    data.value = null
    error.value = null

    // Takes the env variable for the API url and add the resource.
    let reqUrl = import.meta.env.VITE_API_URL + url

    // Check if there are any params and add it to the request url.
    if (params) {
      reqUrl += '?' + new URLSearchParams(params.value).toString()
    }

    // JavaScript's fetch api to get the data.
    // NOTE: The second env variable is needed for fetching data. It is setted
    // in the options of fetch function, in the property "headers".
    // https://developers.themoviedb.org/3/getting-started/authentication
    fetch(reqUrl, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      // Set the response in the stateful variables that will be returned.
      .then(json => (data.value = json))
      .catch(err => (error.value = err))
  }

  // Keep track of stateful params, otherwise execute the doFetch function.
  if (isRef(params)) {
    watchEffect(doFetch)
  } else {
    doFetch()
  }

  return { data, error }
}
