import {
  BottomAlignIcon,
  LeftAlignIcon,
  RightAlignIcon,
  TopAlignIcon,
  XAxisCenterIcon,
  YAxisCenterIcon,
} from '@components/icons'

const alignments: Array<{ icon: JSX.Element; title: string }> = [
  {
    icon: <LeftAlignIcon />,
    title: 'Align element left',
  },
  {
    icon: <XAxisCenterIcon />,
    title: 'Center element on X axis',
  },
  {
    icon: <RightAlignIcon />,
    title: 'Align element right',
  },
  {
    icon: <TopAlignIcon />,
    title: 'Align element top',
  },
  {
    icon: <YAxisCenterIcon />,
    title: 'Center element on Y axis',
  },
  {
    icon: <BottomAlignIcon />,
    title: 'Align element bottom',
  },
]

export { alignments }
