import { SnippetFile } from './types'

const DEFUALT_POSITIONS = {
  top: 50, // 50%
  left: 50, // 50%
}

const DEFUALT_STYLES = {
  rotate: 0, // 0deg
  opacity: 100, // 100%
  scale: 100, // 100%
  width: 270, // 270px
  height: 108, // 108px
}

const DEFAULT_WINDOW_STYLES = {
  padding: 15, // px, inner padding of the code area
  borderRadius: 10, // px
  shadow: 30, // 0-100 intensity
}

const DEFAULT_FILES: SnippetFile[] = [
  {
    id: 'file-1',
    name: 'app.jsx',
    code: '// put your code here',
    language: 'javascript',
  },
]

export { DEFUALT_POSITIONS, DEFUALT_STYLES, DEFAULT_WINDOW_STYLES, DEFAULT_FILES }
