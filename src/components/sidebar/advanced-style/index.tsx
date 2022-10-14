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
          <Slider label='Opacity' value={20} unit='percent' onReset={() => {}} />
          <Slider label='Scale' value={50} unit='percent' onReset={() => {}} />
          <Slider label='Rotate' value={10} unit='degree' onReset={() => {}} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default AdvancedStyle
