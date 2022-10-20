import { HStack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { throttle } from 'radash'
import { useSetRecoilState } from 'recoil'

import { alignments } from '../contants'
import IconButton from '@components/shared/icon-button'
import { editorPosition } from '@store/atoms/code-editor'
import { ActionKeys } from '../types'

const Alignment = () => {
  const setPosition = useSetRecoilState(editorPosition)

  const actions: Record<ActionKeys, () => void> = {
    left: throttle({ interval: 600 }, () => {
      setPosition(prev => ({ ...prev, left: 0 }))
    }),
    right: throttle({ interval: 600 }, () => {
      setPosition(prev => ({ ...prev, left: 100 }))
    }),
    'center-x': throttle({ interval: 600 }, () => {
      setPosition(prev => ({ ...prev, left: 50 }))
    }),
    'center-y': throttle({ interval: 600 }, () => {
      setPosition(prev => ({ ...prev, top: 50 }))
    }),
    top: throttle({ interval: 600 }, () => {
      setPosition(prev => ({ ...prev, top: 0 }))
    }),
    bottom: throttle({ interval: 600 }, () => {
      setPosition(prev => ({ ...prev, top: 100 }))
    }),
  }

  return (
    <VStack alignItems='flex-start' gap={1}>
      <Text fontWeight='medium'>Alignments</Text>
      <HStack spacing={1}>
        {alignments.map(item => (
          <Tooltip key={item.key} px={3} py={2} borderRadius='md' placement='bottom' label={item.title}>
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
