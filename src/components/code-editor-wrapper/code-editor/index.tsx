import {
  useState,
  useCallback,
  FC,
  memo,
  useRef,
  forwardRef,
  ForwardRefRenderFunction,
  RefObject,
  useMemo,
} from 'react'
import { Box } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { rem } from 'polished'
import styled from '@emotion/styled'
import SimpleCodeEditor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css' //Example style, you can use another

import Tab from './tab'
import { JSIcon, WindowButtonsIcon } from '@components/icons'
import { TabData } from '../types'
import Moveable, { OnDragOrigin } from 'react-moveable'
import { getBoundingClientRect } from '../utils'

const MemoizedSimpleCodeEditor: FC<{ code: string | undefined; onChange: (value: string) => void }> = memo(
  ({ code, onChange }) => (
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
      <SimpleCodeEditor
        value={code || ''}
        onValueChange={onChange}
        className='react-simple-code-editor'
        lang='javascript'
        highlight={code => highlight(code, languages.js)}
        translate='no'
      />
    </Box>
  )
)

const CodeEditor: FC<{ containerRef: RefObject<HTMLElement> }> = ({ containerRef }) => {
  const moveableTargetRef = useRef(null)
  const [frame, setFrame] = useState({
    translate: [0, 0],
    rotate: 0,
    transformOrigin: '50% 50%',
  })
  const [tabData, setTabData] = useState<TabData | null>({
    code: '// put your code here',
    icon: <JSIcon />,
    label: 'app.js',
  })

  const deleteTab = useCallback(() => {
    setTabData(null)
  }, [])

  const handleCodeChange = useCallback((newCode: string) => {
    setTabData(prev => ({
      ...prev!,
      code: newCode,
    }))
  }, [])

  const addNewTab = useCallback(() => {
    setTabData({
      code: '',
      label: '',
      icon: null,
    })
  }, [])

  const { top, left, right, bottom } = getBoundingClientRect(containerRef.current)

  console.log({ top, left, right, bottom })
  return (
    <>
      <Wrapper ref={moveableTargetRef}>
        <Header>
          <WindowButtonsIcon />
          <Tab onAddTab={addNewTab} onRemove={deleteTab} tabData={tabData} />
        </Header>
        <AnimatePresence exitBeforeEnter>
          <MemoizedSimpleCodeEditor onChange={handleCodeChange} code={tabData?.code} />
        </AnimatePresence>
      </Wrapper>
      <Moveable
        target={moveableTargetRef}
        container={containerRef.current}
        originDraggable={true}
        originRelative={true}
        draggable={true}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={false}
        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
        rotatable={true}
        throttleRotate={0}
        rotationPosition={'top'}
        bounds={{ position: 'css', top, bottom, left, right }}
        onDragOriginStart={e => {
          e.dragStart && e.dragStart.set(frame.translate)
        }}
        onDragOrigin={({ drag, transformOrigin }) => {
          setFrame(prevFrame => ({ ...prevFrame, translate: drag.beforeTranslate, transformOrigin }))
        }}
        onDragStart={e => {
          e.set(frame.translate)
        }}
        onDrag={e => {
          setFrame(prevFrame => ({ ...prevFrame, translate: e.beforeTranslate }))
        }}
        onRotateStart={e => {
          e.set(frame.rotate)
        }}
        onRotate={({ beforeRotate }) => {
          setFrame(prevFrame => ({ ...prevFrame, rotate: beforeRotate }))
        }}
        onRender={e => {
          const { translate, rotate, transformOrigin } = frame
          e.target.style.transformOrigin = transformOrigin
          e.target.style.transform = `translate(${translate[0]}px, ${translate[1]}px)` + ` rotate(${rotate}deg)`
        }}
      />
    </>
  )
}

const Wrapper = styled(Box)`
  background: rgb(34, 39, 46);
  max-width: ${rem(500)};
  max-height: ${rem(350)};
  min-width: ${rem(270)};
  overflow: hidden;
  border-radius: ${rem(20)};
  opacity: 0.7;
  padding-inline: ${rem(10)};
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
