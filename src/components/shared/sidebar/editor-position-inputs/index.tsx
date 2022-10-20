import { FormLabel, HStack, Text, VStack } from '@chakra-ui/react'
import NumberInput from '@components/shared/number-input'

const EditorPositionInputs = () => {
  return (
    <HStack width='auto' justifyContent='flex-start'>
      <VStack spacing={0} alignItems='flex-start'>
        <FormLabel mb={1} htmlFor='left-input' fontWeight='medium'>
          Left
        </FormLabel>
        <NumberInput numberFieldProps={{ borderRadius: 'md', id: 'left-input' }} numberInputProps={{ size: 'sm' }} />
      </VStack>
      <VStack spacing={0} alignItems='flex-start'>
        <FormLabel mb={1} htmlFor='top-input' fontWeight='medium'>
          Top
        </FormLabel>
        <NumberInput numberFieldProps={{ borderRadius: 'md', id: 'top-input' }} numberInputProps={{ size: 'sm' }} />
      </VStack>
    </HStack>
  )
}

export default EditorPositionInputs
