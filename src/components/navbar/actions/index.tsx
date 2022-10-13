import { Divider, HStack as CHHStack, theme } from '@chakra-ui/react'
import { ExportIcon, ThemesIcon } from '@components/icons'
import { rem } from 'polished'

import Button from '@components/button'
import styled from '@emotion/styled'

const Actions = () => {
  return (
    <HStack>
      <Button
        bg='blue.500'
        color='white'
        _hover={{ bg: 'blue.600' }}
        _active={{ bg: 'blue.700' }}
        type='button'
        leftIcon={<ExportIcon width='1.2rem' height='1.2rem' />}
      >
        Export
      </Button>
      <Divider orientation='vertical' height='10' p={0} m={0} />
      <Button leftIcon={<ThemesIcon width='1.2rem' />}>Theme</Button>
    </HStack>
  )
}

const HStack = styled(CHHStack)`
  box-shadow: rgb(0 0 0 / 5%) 0px 5px 15px, rgb(0 0 0 / 3%) 0px 4px 6px;
  background: white;
  justify-content: space-between;
  padding: ${rem(5)};
  border-radius: ${theme.radii['xl']};
`

export default Actions
