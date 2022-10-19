import { ReactElement } from 'react'

import { HTMLIcon, JSIcon, JSXIcon, PHPIcon, TSIcon, TSXIcon } from '@components/icons'
import { CSSIcon, SASSIcon } from '@components/icons'

const EXTENSIONS = [
  { extention: 'css', icon: <CSSIcon /> },
  { extention: 'scss', icon: <SASSIcon /> },
  { extention: 'sass', icon: <SASSIcon /> },
  { extention: 'js', icon: <JSIcon /> },
  { extention: 'jsx', icon: <JSXIcon /> },
  { extention: 'ts', icon: <TSIcon /> },
  { extention: 'tsx', icon: <TSXIcon /> },
  { extention: 'php', icon: <PHPIcon /> },
  { extention: 'html', icon: <HTMLIcon /> },
  { extention: 'htm', icon: <HTMLIcon /> },
]

const getIconBasedOnExtension = (label: string) => {
  const splited = label.trim().split('.')

  const lastExtenstion = splited.at(-1)?.toLowerCase()

  return EXTENSIONS.find(item => item.extention == lastExtenstion)?.icon || null
}

const getBoundingClientRect = (element: HTMLElement | null): DOMRect => {
  const defaultRects = { top: 0, left: 0, right: 0, bottom: 0, width: 0, x: 0, y: 0, height: 0, toJSON: () => {} }
  if (!element) return defaultRects

  const rectObject = element.getBoundingClientRect()
  return rectObject
}

export { getIconBasedOnExtension, getBoundingClientRect }
