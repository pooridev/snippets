import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'
import theme from '../../theme'
import { ReactElement } from 'react'

global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
}

const render = (ui: ReactElement, options?: RenderOptions) => {
  const Wrapper = ({ children }: { children: ReactElement }) => (
    <ChakraProvider theme={theme}>
      <RecoilRoot>{children}</RecoilRoot>
    </ChakraProvider>
  )
  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...options }),
  }
}

export default render
