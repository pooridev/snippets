import { useRecoilState } from 'recoil'
import { theme } from '@chakra-ui/react'
import prettier from 'prettier/standalone'
import babylon from 'prettier/parser-babel'
import { useHotkeys } from 'react-hotkeys-hook'

import Button from '@components/shared/button'
import { code } from '@store/atoms/code-editor'

const FormatterButton = () => {
  const [codeValue, setCodeValue] = useRecoilState(code)

  const formatCode = () => {
    const formattedCode = prettier
      .format(codeValue, {
        parser: 'babel',
        plugins: [babylon],
      })
      // prevent prettier from adding an empty line
      .replace(/[\r\n]+$/, '')

    setCodeValue(formattedCode)
  }

  useHotkeys(['ctrl+shift+f', 'shift+ctrl+f'], formatCode)

  return (
    <Button onClick={formatCode} bg='gray.200' w='100%' mt={theme.sizes[5]}>
      Format
    </Button>
  )
}

export default FormatterButton
