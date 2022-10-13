import { theme, VStack as ChVStack } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { rem } from 'polished'

import Alignment from './alignment'
import EditorPositionInputs from './editor-position-inputs'

const Sidebar = () => {
  return (
    <VStack as='aside'>
      <Alignment />
      <EditorPositionInputs />
    </VStack>
  )
}

const VStack = styled(ChVStack)`
  position: absolute;
  overflow: hidden auto;
  width: ${rem(240)};
  right: ${rem(20)};
  top: ${rem(50)};
  padding-top: ${theme.space[5]};
  padding-bottom: ${theme.space[2]};
  padding-inline-start: ${theme.space[4]};
  padding-inline-end: ${theme.space[4]};
  box-shadow: rgb(0 0 0 / 5%) -5px 0px 15px, rgb(0 0 0 / 3%) -4px 0px 6px;
  border-radius: ${theme.radii['2xl']};
  background: white;
`

export default Sidebar
