import { HStack } from '@chakra-ui/react'

import Actions from './actions'
import Logo from './logo'

const Navbar = () => {
  return (
    <HStack px={10} py={4} gap={20}>
      <Logo />
      <Actions />
    </HStack>
  )
}

export default Navbar
