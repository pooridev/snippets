import { atom } from 'recoil'

export const editorPosition = atom({
  key: 'editor-position',
  default: {
    top: 50,
    left: 50,
    // right: 50,
    // bottom: 50,
  },
})

export const editorStyles = atom({
  key: 'editor-styles',
  default: {
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
})
