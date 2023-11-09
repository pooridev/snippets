import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { FormLabel, HStack, Text, VStack } from '@chakra-ui/react'

import NumberInput from '@components/shared/number-input'
import { editorPosition } from '@store/atoms/code-editor'
import { DEFUALT_POSITIONS } from '@components/code-editor/constants'
import { leftPosition, topPosition } from '@store/selectors/code-editor'

const LeftPosition = () => {
  const setPosition = useSetRecoilState(editorPosition)
  const left = useRecoilValue(leftPosition)

  const changeLeftPosition = (_: string, newLeft: number) => {
    setPosition(prev => ({
      ...prev,
      left: newLeft || 0,
    }))
  }

  return (
    <VStack spacing={0} alignItems='flex-start'>
      <FormLabel mb={1} htmlFor='left-input' fontWeight='medium'>
        Left
      </FormLabel>
      <NumberInput
        numberFieldProps={{ borderRadius: 'md', id: 'left-input' }}
        numberInputProps={{
          size: 'sm',
          max: 100,
          min: 0,
          value: left,
          defaultValue: DEFUALT_POSITIONS.left,
          onChange: changeLeftPosition,
        }}
      />
    </VStack>
  )
}

const TopPosition = () => {
  const setPosition = useSetRecoilState(editorPosition)
  const top = useRecoilValue(topPosition)

  const changeTopPosition = (_: string, newTop: number) => {
    setPosition(prev => ({
      ...prev,
      top: newTop || 0,
    }))
  }
  return (
    <VStack spacing={0} alignItems='flex-start'>
      <FormLabel mb={1} htmlFor='top-input' fontWeight='medium'>
        Top
      </FormLabel>
      <NumberInput
        numberFieldProps={{ borderRadius: 'md', id: 'top-input' }}
        numberInputProps={{
          size: 'sm',
          min: 0,
          max: 100,
          value: top,
          defaultValue: DEFUALT_POSITIONS.top,
          onChange: changeTopPosition,
        }}
      />
    </VStack>
  )
}

const EditorPositionInputs = () => {
  return (
    <HStack width='auto' justifyContent='flex-start'>
      <LeftPosition />
      <TopPosition />
    </HStack>
  )
}

export default EditorPositionInputs
