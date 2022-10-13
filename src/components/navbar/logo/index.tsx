import styled from '@emotion/styled'
import { rem } from 'polished'
import { Link as CHLink } from '@chakra-ui/react'

import { Img } from '@components/img'

const Logo = () => {
  return (
    <Link href='/'>
      <Img width='50' height='40' src='/assets/logos/logo.webp' alt='Logo' />
      <strong>Snippets</strong>
    </Link>
  )
}

const Link = styled(CHLink)`
  display: flex;
  gap: ${rem(10)};
  align-items: center;
  font-size: ${rem(20)};

  :hover {
    text-decoration: none;
  }
`

export default Logo
