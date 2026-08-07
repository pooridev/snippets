import { useRecoilState, useRecoilValue } from 'recoil'
import { theme, Tooltip, useToast } from '@chakra-ui/react'
import prettier from 'prettier/standalone'
import { useHotkeys } from 'react-hotkeys-hook'
import parserBabel from 'prettier/parser-babel'
import parserTypescript from 'prettier/parser-typescript'
import parserPostcss from 'prettier/parser-postcss'
import parserHtml from 'prettier/parser-html'
import parserMarkdown from 'prettier/parser-markdown'

import Button from '@components/shared/button'
import { activeFileCode, resolvedLanguage } from '@store/selectors/code-editor'

const PLUGINS = [parserBabel, parserTypescript, parserPostcss, parserHtml, parserMarkdown]

const LANGUAGE_TO_PARSER: Record<string, string> = {
  javascript: 'babel',
  jsx: 'babel',
  typescript: 'typescript',
  tsx: 'typescript',
  css: 'css',
  scss: 'scss',
  markup: 'html',
  json: 'json',
  markdown: 'markdown',
}

const FormatterButton = () => {
  const toast = useToast()
  const [codeValue, setCodeValue] = useRecoilState(activeFileCode)
  const language = useRecoilValue(resolvedLanguage)

  const parser = LANGUAGE_TO_PARSER[language]

  const formatCode = () => {
    if (!parser) return

    try {
      const formattedCode = prettier
        .format(codeValue, { parser, plugins: PLUGINS })
        // prevent prettier from adding an empty line
        .replace(/[\r\n]+$/, '')

      setCodeValue(formattedCode)
    } catch {
      toast({
        title: 'Could not format code',
        description: 'The code contains syntax errors.',
        status: 'error',
        duration: 3000,
        position: 'top',
      })
    }
  }

  useHotkeys(['ctrl+shift+f', 'shift+ctrl+f'], formatCode)

  return (
    <Tooltip
      isDisabled={Boolean(parser)}
      label='Formatting is not available for this language'
      px={3}
      py={2}
      borderRadius='md'
      placement='top'
    >
      <Button onClick={formatCode} isDisabled={!parser} bg='gray.200' w='100%' mt={theme.sizes[5]}>
        Format
      </Button>
    </Tooltip>
  )
}

export default FormatterButton
