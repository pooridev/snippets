import { useState, useCallback, FC, memo } from 'react'
import { Box } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { rem } from 'polished'
import styled from '@emotion/styled'
import { useRecoilValue } from 'recoil'
import ReactSimpleCodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css' //Example style, you can use another

import Tab from './tab'
import { JSIcon, WindowButtonsIcon } from '@components/shared/icons'
import { TabData } from '../types'
import { editorPosition, editorStyles } from '@store/atoms/code-editor'
import { toDecimal } from '@utils/toDecimal'

const SimpleCodeEditor = () => {
  const [code, setCode] = useState('// put your code here')
  return (
    <Box
      pt={4}
      pb={6}
      color='white'
      as={motion.div}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 } as any}
      display='flex'
    >
      <ReactSimpleCodeEditor
        value={code || ''}
        onValueChange={value => setCode(value)}
        className='react-simple-code-editor'
        lang='javascript'
        highlight={code => highlight(code, languages.js)}
        translate='no'
      />
    </Box>
  )
}

const CodeEditor = () => {
  const { left, top } = useRecoilValue(editorPosition)
  const { opacity, rotate, scale } = useRecoilValue(editorStyles)

  const [tabData, setTabData] = useState<TabData | null>({
    icon: <JSIcon />,
    label: 'app.js',
  })

  const deleteTab = useCallback(() => {
    setTabData(null)
  }, [])

  const addNewTab = useCallback(() => {
    setTabData({
      label: '',
      icon: null,
    })
  }, [])

  return (
    <Wrapper top={top} left={left} scale={toDecimal(scale)} rotate={rotate} opacity={toDecimal(opacity)}>
      <Header>
        <WindowButtonsIcon />
        <Tab onAddTab={addNewTab} onRemove={deleteTab} tabData={tabData} />
      </Header>
      <AnimatePresence exitBeforeEnter>
        <SimpleCodeEditor />
      </AnimatePresence>
    </Wrapper>
  )
}

const Wrapper = styled(Box)<{ top: number; left: number; opacity: number; rotate: number; scale: number }>`
  background: rgb(34, 39, 46);
  max-width: ${rem(500)};
  max-height: ${rem(350)};
  min-width: ${rem(270)};
  overflow: hidden;
  position: absolute;
  opacity: ${({ opacity }) => opacity} !important;

  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  transform: translate(-${({ left }) => left}%, -${({ top }) => top}%) scale(${({ scale }) => scale})
    rotate(${({ rotate }) => rotate + 'deg'});
  border-radius: ${rem(20)};
  padding-inline: ${rem(10)};
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s;
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
`

const Header = styled(Box)`
  display: flex;
  height: ${rem(44)};
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  gap: ${rem(10)};
`

export default CodeEditor
