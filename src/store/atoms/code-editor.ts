import { atom } from 'recoil'

export const code = atom({
  key: 'code',
  default: '// put your code here',
})

export const editorPosition = atom({
  key: 'editor-position',
  default: {
    top: 50,
    left: 50,
  },
})

export const editorStyles = atom({
  key: 'editor-styles',
  default: {
    opacity: 100,
    scale: 100,
    rotate: 0,
  },
})

export const hoveredPosition = atom({
  key: 'hovered-position',
  default: '',
})
