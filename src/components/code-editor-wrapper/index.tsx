import { useRef } from 'react'
import { Box as ChBox, theme } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Moveable from 'react-moveable'
import { OnResizeStart, OnResize } from 'react-moveable/declaration'

import CodeEditor from './code-editor'

const CodeEditorWrapper = () => {
  const moveableTargetRef = useRef(null)

  return (
    <ChBox>
      <Box ref={moveableTargetRef}>
        <CodeEditor containerRef={moveableTargetRef} />
      </Box>
      <Moveable
        roundRelative
        target={moveableTargetRef}
        resizable
        throttleResize={1}
        originRelative
        keepRatioFinally={false}
        resolveAblesWithRotatable={{
          resizable: ['w', 's'],
        }}
        padding={{ top: 2, bottom: 2, left: 2, right: 2 }}
        bounds={[9, 16]}
        origin={false}
        renderDirections={['se']}
        onResizeStart={({ setOrigin, dragStart, target, set, direction }: OnResizeStart) => {
          setOrigin(['50%', '50%'])
          if (dragStart) dragStart.set([0, 0])
        }}
        onResize={({ target, width, height, drag, direction }: OnResize) => {
          const beforeTranslate = drag.beforeTranslate
          target.style.width = `${width}px`
          target.style.height = `${height}px`
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
        }}
      />
    </ChBox>
  )
}

const Box = styled(ChBox)`
  background: linear-gradient(354deg, rgb(40, 53, 147), rgb(25, 118, 210));
  min-width: 200px;
  width: 400px;
  min-height: 100px;
  border-radius: ${theme.space[1]};
  height: 300px;
  max-width: 550px;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default CodeEditorWrapper
