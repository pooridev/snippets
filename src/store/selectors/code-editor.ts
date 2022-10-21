import { editorPosition } from '@store/atoms/code-editor'
import { selector } from 'recoil'

export const topPosition = selector({
  key: 'top-position',
  get: ({ get }) => {
    const { top } = get(editorPosition)
    return top
  },
})

export const leftPosition = selector({
  key: 'left-position',
  get: ({ get }) => {
    const { left } = get(editorPosition)
    return left
  },
})
