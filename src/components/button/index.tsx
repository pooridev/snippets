import { Button as CHButton, theme } from '@chakra-ui/react'
import styled from '@emotion/styled'

const Button = styled(CHButton)`
  background: ${({ bg }) => (bg ? bg : 'white')};

  :hover {
    background: ${({ bg }) => (bg ? null : theme.colors['gray']['100'])};
  }
`
export default Button
