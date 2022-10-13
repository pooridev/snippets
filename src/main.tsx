import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import './styles/global.css'
import Home from './pages/index'

import theme from '../theme'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Home />
    </ChakraProvider>
  </React.StrictMode>
)
