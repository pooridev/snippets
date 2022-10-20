import {
  Box,
  Text,
  Slider as ChSlider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb as CHSliderThumb,
  Tooltip,
  theme,
  useStyleConfig,
} from '@chakra-ui/react'
import { FC, memo, useRef } from 'react'

import { SliderProps } from '@components/shared/sidebar/types'
import IconButton from '@components/shared/icon-button'
import { ResetIcon } from '@components/shared/icons'
import styled from '@emotion/styled'
import { sliderUnits } from '@components/shared/sidebar/contants'

const Slider: FC<SliderProps> = props => {
  const { label, value, unit, onChange } = props
  const sliderThumbRef = useRef<HTMLDivElement>(null)
  return (
    <Box display='flex' flexDir='column' alignItems='flex-start' w='100%'>
      <Box w='100%' display='flex' justifyContent='space-between' alignItems='center'>
        <Text fontSize='sm' mb='1'>
          {label}
        </Text>
        <Box
          display='flex'
          justifyContent='space-between'
          alignSelf='center'
          alignItems='center'
          color='gray.400'
          fontSize='xs'
          mb='1'
        >
          {value}
          {sliderUnits[unit]}
          <Tooltip px={3} py={2} borderRadius='md' placement='top' label='Reset value'>
            <IconButton ml='1' p={0} size='xs' aria-label='Reset value' icon={<ResetIcon />} />
          </Tooltip>
        </Box>
      </Box>
      <Box w='100%' pr='1.5' pl='1'>
        <ChSlider onChange={onChange} w='100%' aria-label={label + ' slider'} defaultValue={value}>
          <SliderTrack w='100%' borderRadius='3px' h='6px' bg='gray.200'>
            <SliderFilledTrack bg='gray.200' />
          </SliderTrack>
          <SliderThumb ref={sliderThumbRef} />
        </ChSlider>
      </Box>
    </Box>
  )
}

const SliderThumb = styled(CHSliderThumb)`
  width: 20px;
  height: 20px;
  background: ${theme.colors.blue[600]};
  border: 1px solid ${theme.colors.gray[200]};
  :focus {
    box-shadow: ${theme.shadows.outline};
  }
`

export default memo(Slider)
