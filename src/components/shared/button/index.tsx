import { Button as CHButton, theme } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { memo } from 'react'

const Button = styled(CHButton)`
  background: ${({ bg }) => (bg ? bg : 'white')};

  ${({ mt }) => (mt ? `margin-top: ${mt} !important;` : null)}

  :hover {
    background: ${({ bg }) => (bg ? null : theme.colors['gray']['100'])};
  }

  :focus {
    box-shadow: ${theme.shadows.outline};
  }
`
export default Button
