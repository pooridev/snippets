import { IconButton as CHIconButton, theme } from '@chakra-ui/react'
import styled from '@emotion/styled'

const IconButton = styled(CHIconButton)`
  background: ${({ bg }) => (bg ? bg : 'white')};

  :hover {
    background: ${({ bg }) => (bg ? null : theme.colors['gray']['100'])};
  }

  :focus {
    box-shadow: ${theme.shadows.outline};
  }
`
export default IconButton
