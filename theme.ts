import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: 'rgb(241, 241, 241)',
      },
    }),
  },
})

export default theme
