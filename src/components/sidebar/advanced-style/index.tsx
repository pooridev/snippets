import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Text,
  theme,
} from '@chakra-ui/react'
import { useState } from 'react'
import Slider from './slider'

const AdvancedStyle = () => {
  const [state, setState] = useState(20)
  return (
    <Accordion w='100%' allowToggle>
      <AccordionItem
        marginInlineStart={`calc(${theme.space[4]} * -1)`}
        marginInlineEnd={`calc(${theme.space[4]} * -1)`}
      >
        <AccordionButton>
          <Box flex='1' textAlign='left'>
            <Text fontWeight='medium'> Advanced style </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel>
          <Slider label='Opacity' value={state} onChange={setState} unit='percent' />
          <Slider label='Scale' value={50} unit='percent' />
          <Slider label='Rotate' value={10} unit='degree' />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default AdvancedStyle
