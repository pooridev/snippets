import {
  Box,
  Divider,
  HStack as CHHStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
  theme,
  Tooltip,
  useToast,
} from '@chakra-ui/react'
import { rem } from 'polished'
import styled from '@emotion/styled'
import { toBlob, toPng, toSvg } from 'html-to-image'
import { RecoilValue, useRecoilState, useRecoilCallback } from 'recoil'

import { CopyIcon, ExportIcon, ShareIcon, ThemesIcon } from '@components/shared/icons'
import Button from '@components/shared/button'
import { editorBackground, syntaxTheme, SHARED_ATOMS } from '@store/atoms/code-editor'
import { buildShareUrl } from '@store/persistence'
import { SYNTAX_THEMES } from '@components/code-editor/themes'
import { BACKGROUND_THEMES } from './constants'

const downloadDataUrl = (dataUrl: string, filename: string) => {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const getEditorElement = () => document.getElementById('code-editor')!

const Actions = () => {
  const toast = useToast()
  const [background, setBackground] = useRecoilState(editorBackground)
  const [currentSyntaxTheme, setSyntaxTheme] = useRecoilState(syntaxTheme)

  const exportAsPng = (pixelRatio: number) => {
    toPng(getEditorElement(), { pixelRatio }).then(dataUrl => downloadDataUrl(dataUrl, 'snippets.png'))
  }

  const exportAsSvg = () => {
    toSvg(getEditorElement()).then(dataUrl => downloadDataUrl(dataUrl, 'snippets.svg'))
  }

  const copyToClipboard = async () => {
    try {
      const blob = await toBlob(getEditorElement(), { pixelRatio: 2 })
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob! })])

      toast({
        title: 'Image copied to clipboard',
        status: 'success',
        duration: 2000,
        position: 'top',
      })
    } catch {
      toast({
        title: 'Could not copy image',
        description: 'Your browser may not support copying images to the clipboard.',
        status: 'error',
        duration: 3000,
        position: 'top',
      })
    }
  }

  const copyShareLink = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const state: Record<string, unknown> = {}
        for (const [key, atom] of Object.entries(SHARED_ATOMS)) {
          state[key] = await snapshot.getPromise(atom as RecoilValue<unknown>)
        }

        try {
          await navigator.clipboard.writeText(buildShareUrl(state))
          toast({
            title: 'Share link copied to clipboard',
            description: 'Anyone opening the link will see this exact snippet.',
            status: 'success',
            duration: 4000,
            position: 'top',
          })
        } catch {
          toast({
            title: 'Could not copy the share link',
            status: 'error',
            duration: 3000,
            position: 'top',
          })
        }
      },
    [toast]
  )

  return (
    <HStack>
      <Menu placement='bottom-end'>
        <MenuButton
          as={Button}
          bg='blue.500'
          color='white'
          _hover={{ bg: 'blue.600' }}
          _active={{ bg: 'blue.700' }}
          type='button'
          leftIcon={<ExportIcon width='1.2rem' height='1.2rem' />}
        >
          Export
        </MenuButton>
        <MenuList borderRadius={theme.radii.xl} minWidth='10rem'>
          <MenuItem onClick={() => exportAsPng(1)}>PNG · 1x</MenuItem>
          <MenuItem onClick={() => exportAsPng(2)}>PNG · 2x</MenuItem>
          <MenuItem onClick={() => exportAsPng(4)}>PNG · 4x</MenuItem>
          <MenuDivider />
          <MenuItem onClick={exportAsSvg}>SVG</MenuItem>
        </MenuList>
      </Menu>
      <Button type='button' onClick={copyToClipboard} leftIcon={<CopyIcon width='1.1rem' height='1.1rem' />}>
        Copy
      </Button>
      <Button type='button' onClick={copyShareLink} leftIcon={<ShareIcon width='1.1rem' height='1.1rem' />}>
        Share
      </Button>
      <Divider orientation='vertical' height='10' p={0} m={0} />
      <Popover placement='bottom-end'>
        <PopoverTrigger>
          <Button type='button' leftIcon={<ThemesIcon width='1.2rem' />}>
            Theme
          </Button>
        </PopoverTrigger>
        <PopoverContent width='auto' borderRadius={theme.radii['xl']}>
          <PopoverBody p={3}>
            <Text fontSize='xs' fontWeight='semibold' color='gray.500' mb={2}>
              Background
            </Text>
            <SimpleGrid columns={4} spacing={2} mb={4}>
              {BACKGROUND_THEMES.map(({ name, gradient }) => (
                <Tooltip key={name} label={name} placement='bottom' hasArrow>
                  <Box
                    as='button'
                    type='button'
                    aria-label={`${name} theme`}
                    onClick={() => setBackground(gradient)}
                    width={8}
                    height={8}
                    borderRadius='full'
                    bg={gradient}
                    border='2px solid'
                    borderColor={background === gradient ? 'blue.500' : 'transparent'}
                    _hover={{ transform: 'scale(1.1)' }}
                    transition='all 0.15s ease'
                  />
                </Tooltip>
              ))}
            </SimpleGrid>
            <Text fontSize='xs' fontWeight='semibold' color='gray.500' mb={2}>
              Window theme
            </Text>
            <Box display='flex' flexDirection='column' gap={1}>
              {SYNTAX_THEMES.map(item => (
                <Box
                  key={item.key}
                  as='button'
                  type='button'
                  display='flex'
                  alignItems='center'
                  gap={2}
                  px={2}
                  py={1.5}
                  borderRadius='md'
                  bg={currentSyntaxTheme === item.key ? 'blue.50' : 'transparent'}
                  border='1px solid'
                  borderColor={currentSyntaxTheme === item.key ? 'blue.400' : 'transparent'}
                  _hover={{ bg: currentSyntaxTheme === item.key ? 'blue.50' : 'gray.50' }}
                  onClick={() => setSyntaxTheme(item.key)}
                >
                  <Box
                    width={4}
                    height={4}
                    borderRadius='sm'
                    bg={item.background}
                    border='1px solid'
                    borderColor='gray.300'
                  />
                  <Text fontSize='sm'>{item.name}</Text>
                </Box>
              ))}
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </HStack>
  )
}

const HStack = styled(CHHStack)`
  box-shadow: rgb(0 0 0 / 5%) 0px 5px 15px, rgb(0 0 0 / 3%) 0px 4px 6px;
  background: white;
  justify-content: space-between;
  padding: ${rem(5)};
  border-radius: ${theme.radii.xl};
`

export default Actions
