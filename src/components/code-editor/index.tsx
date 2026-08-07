import { memo, PointerEvent as ReactPointerEvent, useRef, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { rem } from 'polished'
import styled from '@emotion/styled'
import { useRecoilState, useRecoilValue } from 'recoil'
import ReactSimpleCodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-markdown'

import Tabs from './tab'
import { WindowButtonsIcon } from '@components/shared/icons'
import { editorPosition, editorStyles, windowStyles } from '@store/atoms/code-editor'
import { activeFile, activeFileCode, currentSyntaxTheme, resolvedLanguage } from '@store/selectors/code-editor'
import { toDecimal } from '@utils/toDecimal'
import Background from './background'
import { buildTokenStyles, SyntaxTheme } from './themes'

const EditorRenderer = () => {
  const [codeValue, setCodeValue] = useRecoilState(activeFileCode)
  const currentLanguage = useRecoilValue(resolvedLanguage)
  const { padding } = useRecoilValue(windowStyles)

  return (
    <Box
      paddingInline={`${padding}px`}
      pt={`${Math.round(padding * 0.75)}px`}
      pb={`${padding}px`}
      as={motion.div}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 } as any}
      display='flex'
    >
      <ReactSimpleCodeEditor
        value={codeValue || ''}
        onValueChange={value => setCodeValue(value)}
        className='react-simple-code-editor'
        lang={currentLanguage}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
        }}
        highlight={code => highlight(code, languages[currentLanguage] || languages.js, currentLanguage)}
        translate='no'
        spellCheck='false'
      />
    </Box>
  )
}

type DragContext = {
  startX: number
  startY: number
  startLeft: number
  startTop: number
  rangeX: number
  rangeY: number
}

const clampPercent = (value: number) => Math.min(100, Math.max(0, Math.round(value * 10) / 10))

const CodeEditor = () => {
  const [{ left, top }, setPosition] = useRecoilState(editorPosition)
  const { opacity, rotate, scale } = useRecoilValue(editorStyles)
  const { borderRadius, shadow } = useRecoilValue(windowStyles)
  const syntaxTheme = useRecoilValue(currentSyntaxTheme)
  const currentFile = useRecoilValue(activeFile)

  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const dragContext = useRef<DragContext | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (event: ReactPointerEvent<HTMLDivElement>) => {
    // let tab inputs and buttons receive clicks normally
    if ((event.target as HTMLElement).closest('input, button')) return

    const wrapper = wrapperRef.current
    const container = wrapper?.offsetParent as HTMLElement | null
    if (!wrapper || !container) return

    dragContext.current = {
      startX: event.clientX,
      startY: event.clientY,
      startLeft: left,
      startTop: top,
      rangeX: container.clientWidth - wrapper.offsetWidth,
      rangeY: container.clientHeight - wrapper.offsetHeight,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
  }

  const handleDragMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const context = dragContext.current
    if (!context) return

    const { startX, startY, startLeft, startTop, rangeX, rangeY } = context
    setPosition(prev => ({
      left: rangeX > 0 ? clampPercent(startLeft + ((event.clientX - startX) / rangeX) * 100) : prev.left,
      top: rangeY > 0 ? clampPercent(startTop + ((event.clientY - startY) / rangeY) * 100) : prev.top,
    }))
  }

  const handleDragEnd = () => {
    dragContext.current = null
    setIsDragging(false)
  }

  return (
    <Background>
      <Wrapper
        ref={wrapperRef}
        aria-label='code-editor'
        top={top}
        left={left}
        scale={toDecimal(scale)}
        rotate={rotate}
        opacity={toDecimal(opacity)}
        borderRadius={borderRadius}
        shadow={shadow}
        isDragging={isDragging}
        syntaxTheme={syntaxTheme}
      >
        <Header
          overlay={syntaxTheme.headerOverlay}
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <WindowButtonsIcon />
          <Tabs />
        </Header>
        <AnimatePresence exitBeforeEnter>
          <EditorRenderer key={currentFile.id} />
        </AnimatePresence>
      </Wrapper>
    </Background>
  )
}

const buildShadow = (intensity: number) => {
  if (intensity <= 0) return 'none'
  return `rgba(0, 0, 0, ${(intensity * 0.004).toFixed(3)}) 0px ${intensity * 0.2}px ${intensity * 0.5}px`
}

const Wrapper = styled(Box, {
  shouldForwardProp: prop => !['syntaxTheme', 'isDragging', 'borderRadius', 'shadow'].includes(prop as string),
})<{
  top: number
  left: number
  opacity: number
  rotate: number
  scale: number
  borderRadius: number
  shadow: number
  isDragging: boolean
  syntaxTheme: SyntaxTheme
}>`
  background: ${({ syntaxTheme }) => syntaxTheme.background};
  color: ${({ syntaxTheme }) => syntaxTheme.text};
  max-width: ${rem(500)};
  max-height: ${rem(350)};
  min-width: ${rem(270)};
  overflow: hidden;
  position: absolute;
  opacity: ${({ opacity }) => opacity} !important;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  translate: -${({ left }) => left}% -${({ top }) => top}%;
  scale: ${({ scale }) => scale};
  rotate: ${({ rotate }) => rotate + 'deg'};
  transform-origin: center center;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  transition: ${({ isDragging }) => (isDragging ? 'none' : 'all cubic-bezier(0.165, 0.84, 0.44, 1) 0.2s')};
  box-shadow: ${({ shadow }) => buildShadow(shadow)};
  ${({ syntaxTheme }) => buildTokenStyles(syntaxTheme)}
`

const Header = styled(Box, { shouldForwardProp: prop => prop !== 'overlay' })<{ overlay: string }>`
  display: flex;
  height: ${rem(44)};
  flex-direction: row;
  padding-inline: ${rem(15)};
  align-items: center;
  position: relative;
  gap: ${rem(10)};
  background: ${({ overlay }) => overlay};
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`

export default memo(CodeEditor)
