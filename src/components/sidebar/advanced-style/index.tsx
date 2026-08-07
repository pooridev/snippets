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
import { useRecoilState } from 'recoil'

import { DEFAULT_WINDOW_STYLES, DEFUALT_STYLES } from '@components/code-editor/constants'
import { editorStyles, windowStyles } from '@store/atoms/code-editor'
import Slider from './slider'

const TransformSliders = () => {
  const [styles, setStyles] = useRecoilState(editorStyles)

  return (
    <>
      <Slider
        label='Opacity'
        value={styles.opacity}
        defaultValue={DEFUALT_STYLES.opacity}
        min={0}
        max={100}
        unit='percent'
        onChange={opacity => setStyles(prev => ({ ...prev, opacity }))}
      />
      <Slider
        label='Scale'
        value={styles.scale}
        defaultValue={DEFUALT_STYLES.scale}
        min={0}
        max={200}
        unit='percent'
        onChange={scale => setStyles(prev => ({ ...prev, scale }))}
      />
      <Slider
        label='Rotate'
        value={styles.rotate}
        defaultValue={DEFUALT_STYLES.rotate}
        min={-180}
        max={180}
        unit='degree'
        onChange={rotate => setStyles(prev => ({ ...prev, rotate }))}
      />
    </>
  )
}

const WindowSliders = () => {
  const [styles, setStyles] = useRecoilState(windowStyles)

  return (
    <>
      <Slider
        label='Padding'
        value={styles.padding}
        defaultValue={DEFAULT_WINDOW_STYLES.padding}
        min={0}
        max={64}
        unit='pixel'
        onChange={padding => setStyles(prev => ({ ...prev, padding }))}
      />
      <Slider
        label='Border radius'
        value={styles.borderRadius}
        defaultValue={DEFAULT_WINDOW_STYLES.borderRadius}
        min={0}
        max={40}
        unit='pixel'
        onChange={borderRadius => setStyles(prev => ({ ...prev, borderRadius }))}
      />
      <Slider
        label='Shadow'
        value={styles.shadow}
        defaultValue={DEFAULT_WINDOW_STYLES.shadow}
        min={0}
        max={100}
        unit='percent'
        onChange={shadow => setStyles(prev => ({ ...prev, shadow }))}
      />
    </>
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
            <Text fontWeight='medium'> Window style </Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel>
          <WindowSliders />
        </AccordionPanel>
      </AccordionItem>
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
          <TransformSliders />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

export default AdvancedStyle
