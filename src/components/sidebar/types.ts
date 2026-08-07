import { SliderProps as CHSliderProps } from '@chakra-ui/react'

export type SliderProps = Pick<CHSliderProps, 'onChange' | 'max' | 'min'> & {
  label: string
  value: number
  defaultValue: number
  unit: 'percent' | 'degree' | 'pixel'
}

export type ActionKeys = 'left' | 'right' | 'center-x' | 'center-y' | 'top' | 'bottom'
