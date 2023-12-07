import { Box } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'

import { hoveredPosition } from '@store/atoms/code-editor'
import { topPosition, leftPosition } from '@store/selectors/code-editor'

const getPositionProps = (position: string, top: number, left: number) => {
  switch (position) {
    case 'left':
      return { top: `${top}%`, left: 0, transform: `translate(-0%, -${top}%)` }
    case 'center-x':
      return { top: `${top}%`, left: '50%', transform: `translate(-50%, -${top}%)` }
    case 'right':
      return { top: `${top}%`, right: 0, transform: `translate(-0%, -${top}%)` }
    case 'top':
      return { top: 0, left: `${left}%`, transform: `translate(-${left}%, -0%)` }
    case 'center-y':
      return { top: '50%', left: `${left}%`, transform: `translate(-${left}%, -50%)` }
    case 'bottom':
      return { bottom: 0, left: `${left}%`, transform: `translate(-${left}%, -0%)` }
    default:
      return {}
  }
}

export default function PreviewNextPosition() {
  const top = useRecoilValue(topPosition)
  const left = useRecoilValue(leftPosition)
  const hovered = useRecoilValue(hoveredPosition)

  if (!hovered) return null

  const width = document.querySelector('[aria-label="code-editor"]')?.clientWidth
  const height = document.querySelector('[aria-label="code-editor"]')?.clientHeight
  const positionProps = getPositionProps(hovered, top, left)

  return (
    <Box
      pos='absolute'
      width={width}
      height={height}
      borderWidth={2}
      borderStyle='solid'
      borderColor='orange.400'
      {...positionProps}
    />
  )
}
