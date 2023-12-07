import { throttle } from 'radash'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { HStack, Text, Tooltip, VStack } from '@chakra-ui/react'

import { editorPosition, hoveredPosition } from '@store/atoms/code-editor'
import IconButton from '@components/shared/icon-button'

import { alignments } from '../contants'
import { ActionKeys } from '../types'

const throttleInterval = 600 // 600ms

export default function Alignment() {
  const setPosition = useSetRecoilState(editorPosition)
  const setHovered = useSetRecoilState(hoveredPosition)

  const actions: Record<ActionKeys, () => void> = {
    left: throttle({ interval: throttleInterval }, () => setPosition(prev => ({ ...prev, left: 0 }))),

    right: throttle({ interval: throttleInterval }, () => setPosition(prev => ({ ...prev, left: 100 }))),

    'center-x': throttle({ interval: throttleInterval }, () => setPosition(prev => ({ ...prev, left: 50 }))),

    'center-y': throttle({ interval: throttleInterval }, () => setPosition(prev => ({ ...prev, top: 50 }))),

    top: throttle({ interval: throttleInterval }, () => setPosition(prev => ({ ...prev, top: 0 }))),

    bottom: throttle({ interval: throttleInterval }, () => setPosition(prev => ({ ...prev, top: 100 }))),
  }

  return (
    <VStack w='full' alignItems='flex-start' gap={1}>
      <Text fontWeight='medium'>Alignments</Text>
      <HStack spacing={0}>
        {alignments.map(item => (
          <Tooltip key={item.key} px={3} py={2} borderRadius='md' placement='bottom' label={item.title}>
            <IconButton
              aria-label={item.title}
              size='sm'
              borderRadius='md'
              icon={item.icon}
              onClick={actions[item.key]}
              onMouseOut={() => setHovered('')}
              onMouseOver={() => setHovered(item.key)}
            />
          </Tooltip>
        ))}
      </HStack>
    </VStack>
  )
}
