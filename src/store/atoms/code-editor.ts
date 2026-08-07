import { atom } from 'recoil'

import { SnippetFile } from '@components/code-editor/types'
import { DEFAULT_FILES, DEFAULT_WINDOW_STYLES, DEFUALT_POSITIONS, DEFUALT_STYLES } from '@components/code-editor/constants'
import { DEFAULT_SYNTAX_THEME } from '@components/code-editor/themes'
import { persistEffect } from '@store/persistence'

export const files = atom<SnippetFile[]>({
  key: 'files',
  default: DEFAULT_FILES,
  effects: [persistEffect('files')],
})

export const activeFileId = atom({
  key: 'active-file-id',
  default: DEFAULT_FILES[0].id,
  effects: [persistEffect('active-file-id')],
})

export const editorPosition = atom({
  key: 'editor-position',
  default: DEFUALT_POSITIONS,
  effects: [persistEffect('editor-position')],
})

export const editorStyles = atom({
  key: 'editor-styles',
  default: {
    opacity: DEFUALT_STYLES.opacity,
    scale: DEFUALT_STYLES.scale,
    rotate: DEFUALT_STYLES.rotate,
  },
  effects: [persistEffect('editor-styles')],
})

export const windowStyles = atom({
  key: 'window-styles',
  default: DEFAULT_WINDOW_STYLES,
  effects: [persistEffect('window-styles')],
})

export const hoveredPosition = atom({
  key: 'hovered-position',
  default: '',
})

export const editorBackground = atom({
  key: 'editor-background',
  default: 'linear-gradient(354deg, rgb(40, 53, 147), rgb(25, 118, 210))',
  effects: [persistEffect('editor-background')],
})

export const syntaxTheme = atom({
  key: 'syntax-theme',
  default: DEFAULT_SYNTAX_THEME,
  effects: [persistEffect('syntax-theme')],
})

/** Atom keys included in share links, in the shape `buildShareUrl` expects. */
export const SHARED_ATOMS = {
  files,
  'active-file-id': activeFileId,
  'editor-position': editorPosition,
  'editor-styles': editorStyles,
  'window-styles': windowStyles,
  'editor-background': editorBackground,
  'syntax-theme': syntaxTheme,
} as const
