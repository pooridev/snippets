import { Box as ChBox, forwardRef, theme } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Moveable from 'react-moveable'
import { useState, useRef } from 'react'
import { OnResizeStart, OnResize, OnResizeEnd, OnBeforeResize } from 'react-moveable/declaration'

const CodeEditorWrapper = () => {
  const moveableTargetRef = useRef(null)

  return (
    <div>
      <Box ref={moveableTargetRef}></Box>
      <Moveable
        roundRelative
        target={moveableTargetRef}
        resizable
        throttleResize={1}
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
      ></Moveable>
    </div>
  )
}

const Box = styled(ChBox)`
  background: linear-gradient(354deg, rgb(40, 53, 147), rgb(25, 118, 210));
  min-width: 200px;
  width: 400px;
  min-height: 100px;
  border-radius: ${theme.space[5]};
  height: 300px;
  max-width: 550px;
  max-height: 400px;
  position: relative;

  ::before {
    content: '';
    position: absolute;
    width: calc(100% + 9px);
    height: calc(100% + 9px);
    background: transparent;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: ${theme.space[5]};
    border-bottom-right-radius: 0;
    border: 1px solid ${theme.colors.blue[600]};
  }
`

export default CodeEditorWrapper
