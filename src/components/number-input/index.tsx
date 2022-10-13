import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChNumberInput,
  NumberInputField,
  NumberInputFieldProps,
  NumberInputProps,
  NumberInputStepper,
} from '@chakra-ui/react'
import { FC } from 'react'

const NumberInput: FC<{ numberInputProps?: NumberInputProps; numberFieldProps?: NumberInputFieldProps }> = props => {
  const { numberFieldProps, numberInputProps } = props
  return (
    <ChNumberInput {...numberInputProps}>
      <NumberInputField {...numberFieldProps} />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </ChNumberInput>
  )
}

export default NumberInput
