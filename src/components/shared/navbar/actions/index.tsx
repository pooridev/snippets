import { Divider, HStack as CHHStack, theme } from '@chakra-ui/react'
import { rem } from 'polished'
import styled from '@emotion/styled'
import { toPng } from 'html-to-image'

import { ExportIcon, ThemesIcon } from '@components/shared/icons'
import Button from '@components/shared/button'

const Actions = () => {
  const downloadEditorComponentAsPng = () => {
    const codeEditorEl = document.getElementById('code-editor')

    toPng(codeEditorEl!).then(b64 => {
      const link = document.createElement('a')
      link.href = b64

      link.download = 'snipppets.png'
      document.body.appendChild(link)

      link.click()
      document.body.removeChild(link)
    })
  }

  return (
    <HStack>
      <Button
        bg='blue.500'
        color='white'
        onClick={downloadEditorComponentAsPng}
        _hover={{ bg: 'blue.600' }}
        _active={{ bg: 'blue.700' }}
        type='button'
        leftIcon={<ExportIcon width='1.2rem' height='1.2rem' />}
      >
        Export
      </Button>
      <Divider orientation='vertical' height='10' p={0} m={0} />
      <Button leftIcon={<ThemesIcon width='1.2rem' />}>Theme</Button>
    </HStack>
  )
}

const HStack = styled(CHHStack)`
  box-shadow: rgb(0 0 0 / 5%) 0px 5px 15px, rgb(0 0 0 / 3%) 0px 4px 6px;
  background: white;
  justify-content: space-between;
  padding: ${rem(5)};
  border-radius: ${theme.radii['xl']};
`

export default Actions
