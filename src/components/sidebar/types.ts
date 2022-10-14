import { SliderProps as CHSliderProps } from '@chakra-ui/react'

export type SliderProps = Pick<CHSliderProps, 'onChange'> & {
  label: string
  value: number
  unit: 'percent' | 'degree'
  onReset?: () => void
}
