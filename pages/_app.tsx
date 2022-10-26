import {ChakraProvider, extendTheme} from "@chakra-ui/react"
// We could have wraped this playerlayout component in index file around different pages individually
// But that would reload this layout upon navigation
// And since the playerlayout has a music playing state, the song will start over and over again
// If you do not have a state, you can easily wrap it around index file pages, visually this will not create much difference
import PlayerLayout from "../components/playerLayout"
// reset css for every single browser
import 'reset-css'
import { StoreProvider } from "easy-peasy"
import { store } from '../lib/store'


// ChakraUI has a weird bluish-grey
// customizing that to a decent color
const theme = extendTheme({
  colors : {
    gray: {
      100: '#F5f5f5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },

  // fixing anchor tag, and their underline and shadow
  components: {
    Button: {
      variants: {
        link: {
          ':focus': {
            outline: 'none',
            boxShadow: 'none'
          }
        }
      }
    }
  }
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <StoreProvider store={store}>
        {Component.authPage ? (
          // If the component has an authPage property, do not wrap it in layout
          <Component {...pageProps} />
        ): <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        }
      </StoreProvider>
    </ChakraProvider>
  )
}

export default MyApp
