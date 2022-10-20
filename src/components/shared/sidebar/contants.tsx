import {
  BottomAlignIcon,
  LeftAlignIcon,
  RightAlignIcon,
  TopAlignIcon,
  XAxisCenterIcon,
  YAxisCenterIcon,
} from '@components/shared/icons'
import { ActionKeys } from './types'

const alignments: Array<{ icon: JSX.Element; title: string; key: ActionKeys }> = [
  {
    icon: <LeftAlignIcon />,
    title: 'Align element left',
    key: 'left',
  },
  {
    icon: <XAxisCenterIcon />,
    title: 'Center element on X axis',
    key: 'center-x',
  },
  {
    icon: <RightAlignIcon />,
    title: 'Align element right',
    key: 'right',
  },
  {
    icon: <TopAlignIcon />,
    title: 'Align element top',
    key: 'top',
  },
  {
    icon: <YAxisCenterIcon />,
    title: 'Center element on Y axis',
    key: 'center-y',
  },
  {
    icon: <BottomAlignIcon />,
    title: 'Align element bottom',
    key: 'bottom',
  },
]

const sliderUnits: Record<string, string> = {
  degree: 'deg',
  percent: '%',
}

export { alignments, sliderUnits }
