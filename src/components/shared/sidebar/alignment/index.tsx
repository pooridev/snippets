import { HStack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'

import { alignments } from '../contants'
import IconButton from '@components/shared/icon-button'
import { editorPosition } from '@store/atoms/code-editor'

const Alignment = () => {
  const setPosition = useSetRecoilState(editorPosition)

  const actions = {
    left: () => {
      setPosition(prev => ({ ...prev, left: 0 }))
    },
    right: () => {
      setPosition(prev => ({ ...prev, left: 100 }))
    },
    'center-x': () => {
      setPosition(prev => ({ ...prev, left: 50 }))
    },
    'center-y': () => {
      setPosition(prev => ({ ...prev, top: 50 }))
    },
    top: () => {
      setPosition(prev => ({ ...prev, top: 0 }))
    },
    bottom: () => {
      setPosition(prev => ({ ...prev, top: 100 }))
    },
  }

  return (
    <VStack alignItems='flex-start' gap={1}>
      <Text fontWeight='medium'>Alignments</Text>
      <HStack spacing={1}>
        {alignments.map(item => (
          <Tooltip px={3} py={2} borderRadius='md' placement='bottom' label={item.title}>
            <IconButton
              onClick={actions[item.key]}
              size='sm'
              borderRadius='md'
              aria-label={item.title}
              icon={item.icon}
            />
          </Tooltip>
        ))}
      </HStack>
    </VStack>
  )
}

export default Alignment
