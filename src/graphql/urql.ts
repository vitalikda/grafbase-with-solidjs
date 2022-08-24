import { ClientOptions, createClient } from 'solid-urql'

const { VITE_GRAFBASE_API_URL, VITE_GRAFBASE_API_KEY } = import.meta.env

export const urqlClientBaseConfig: ClientOptions = {
  url: VITE_GRAFBASE_API_URL,
  requestPolicy: 'cache-and-network',
  fetchOptions: () => ({
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': VITE_GRAFBASE_API_KEY
    }
  })
}

export const urqlClient = createClient({
  ...urqlClientBaseConfig
})
