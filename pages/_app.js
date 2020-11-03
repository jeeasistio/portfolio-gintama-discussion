import { SWRConfig } from 'swr'
import { UserProvider } from '../lib/UserContext'
import 'bootswatch/dist/flatly/bootstrap.min.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SWRConfig value={{
        fetcher: (...args) => axios.get(...args).then(res => res.data)
      }}>
        <Component {...pageProps} />
      </SWRConfig>
    </UserProvider>
  )
}

export default MyApp
