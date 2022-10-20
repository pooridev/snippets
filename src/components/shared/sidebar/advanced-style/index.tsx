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
import { useSetRecoilState } from 'recoil'

import { DEFUALT_STYLES } from '@components/code-editor-wrapper/constants'
import { editorStyles } from '@store/atoms/code-editor'
import Slider from './slider'

const Opacity = () => {
  const setStyles = useSetRecoilState(editorStyles)

  return (
    <Slider
      label='Opacity'
      value={DEFUALT_STYLES.opacity}
      min={0}
      max={100}
      onChange={value => {
        setStyles(prev => ({ ...prev, opacity: value }))
      }}
      unit='percent'
    />
  )
}

const Scale = () => {
  const setStyles = useSetRecoilState(editorStyles)

  return (
    <Slider
      label='Scale'
      value={DEFUALT_STYLES.scale}
      unit='percent'
      min={0}
      max={200}
      onChange={value => {
        setStyles(prev => ({ ...prev, scale: value }))
      }}
    />
  )
}

const Rotate = () => {
  const setStyles = useSetRecoilState(editorStyles)

  return (
    <Slider
      min={-180}
      max={180}
      label='Rotate'
      value={DEFUALT_STYLES.rotate}
      onChange={value => {
        setStyles(prev => ({ ...prev, rotate: value }))
      }}
      unit='degree'
    />
  )
}

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
          <Opacity />
          <Scale />
          <Rotate />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default AdvancedStyle
