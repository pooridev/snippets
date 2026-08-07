import { PropsWithChildren, useRef, useState } from 'react'
import { OnResizeStart, OnResize } from 'react-moveable/declaration'
import { Box, theme } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Moveable from 'react-moveable'
import { useRecoilValue } from 'recoil'

import PreviewNextPosition from '../preview-next-position'
import { editorBackground } from '@store/atoms/code-editor'

const Background = ({ children }: PropsWithChildren) => {
  const background = useRecoilValue(editorBackground)
  const moveableTargetRef = useRef<HTMLDivElement | null>(null)

  const [frame, setFrame] = useState({
    translate: [0, 0],
  })

  return (
    <>
      <Wrapper id='code-editor' bg={background} ref={moveableTargetRef}>
        {children}
        <PreviewNextPosition />
      </Wrapper>
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
        onResizeStart={({ setOrigin, dragStart }: OnResizeStart) => {
          setOrigin(['50%', '50%'])
          if (dragStart) dragStart.set(frame.translate)
        }}
        onResize={({ target, width, height, drag }: OnResize) => {
          const beforeTranslate = drag.beforeTranslate
          setFrame({ translate: beforeTranslate })
          target.style.width = `${width}px`
          target.style.height = `${height}px`
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`
        }}
      />
    </>
  )
}

const Wrapper = styled(Box)`
  min-width: 200px;
  width: 400px;
  min-height: 100px;
  border-radius: ${theme.space[1]};
  height: 300px;
  max-width: 550px;
  max-height: 400px;
  position: relative;
`

export default Background
