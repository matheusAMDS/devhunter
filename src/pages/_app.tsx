import { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"

import theme from "theme"

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
