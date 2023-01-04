import { SliderProps as CHSliderProps } from '@chakra-ui/react'

export type SliderProps = Pick<CHSliderProps, 'onChange' | 'max' | 'min'> & {
  label: string
  value: number
  unit: 'percent' | 'degree'
}

export type ActionKeys = 'left' | 'right' | 'center-x' | 'center-y' | 'top' | 'bottom'
