import { SliderProps as CHSliderProps } from '@chakra-ui/react'

export type SliderProps = Pick<CHSliderProps, 'onChange'> & {
  label: string
  value: number
  unit: 'percent' | 'degree'
  onReset?: () => void
}

export type ActionKeys = 'left' | 'right' | 'center-x' | 'center-y' | 'top' | 'bottom'
