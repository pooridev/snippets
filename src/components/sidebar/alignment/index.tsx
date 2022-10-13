import { HStack, Text, Tooltip, VStack } from '@chakra-ui/react'

import { alignments } from '../contants'
import IconButton from '@components/IconButton'

const Alignment = () => {
  return (
    <VStack alignItems='flex-start' gap={1}>
      <Text fontWeight='medium'>Alignments</Text>
      <HStack spacing={1}>
        {alignments.map(item => (
          <Tooltip px={3} py={2} borderRadius='md' placement='bottom' label={item.title}>
            <IconButton size='sm' borderRadius='md' aria-label={item.title} icon={item.icon} />
          </Tooltip>
        ))}
      </HStack>
    </VStack>
  )
}

export default Alignment
