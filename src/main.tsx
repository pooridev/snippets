import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import Home from './pages/home'

import theme from '../theme'

import './styles/moveable.css'
import './styles/react-simple-code-editor.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    </ChakraProvider>
  </React.StrictMode>
)
