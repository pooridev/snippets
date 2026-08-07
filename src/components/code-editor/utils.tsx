import { HTMLIcon, JSIcon, JSXIcon, PHPIcon, TSIcon, TSXIcon, CSSIcon, SASSIcon } from '@components/shared/icons'

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

const EXTENSION_TO_LANGUAGE: Record<string, string> = {
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  jsx: 'jsx',
  ts: 'typescript',
  tsx: 'tsx',
  css: 'css',
  scss: 'scss',
  sass: 'scss',
  php: 'php',
  html: 'markup',
  htm: 'markup',
  xml: 'markup',
  svg: 'markup',
  py: 'python',
  json: 'json',
  yml: 'yaml',
  yaml: 'yaml',
  sh: 'bash',
  bash: 'bash',
  zsh: 'bash',
  go: 'go',
  rs: 'rust',
  java: 'java',
  sql: 'sql',
  md: 'markdown',
}

/** Languages offered in the sidebar picker; ids are Prism grammar names. */
const SUPPORTED_LANGUAGES: Array<{ id: string; name: string }> = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'jsx', name: 'JSX' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'tsx', name: 'TSX' },
  { id: 'css', name: 'CSS' },
  { id: 'scss', name: 'SCSS' },
  { id: 'markup', name: 'HTML' },
  { id: 'php', name: 'PHP' },
  { id: 'python', name: 'Python' },
  { id: 'json', name: 'JSON' },
  { id: 'yaml', name: 'YAML' },
  { id: 'bash', name: 'Bash' },
  { id: 'go', name: 'Go' },
  { id: 'rust', name: 'Rust' },
  { id: 'java', name: 'Java' },
  { id: 'sql', name: 'SQL' },
  { id: 'markdown', name: 'Markdown' },
]

const extensionToLanguage = (extension: string): string | null => {
  return EXTENSION_TO_LANGUAGE[extension] || null
}

const extractExtension = (label: string) => {
  const splited = label.trim().split('.')

  const lastExtenstion = splited.at(-1)!.toLowerCase()
  return lastExtenstion
}

const findIconByLabel = (label: string) => {
  const extenstion = extractExtension(label)
  return EXTENSIONS.find(item => item.extention == extenstion)?.icon || null
}

const getBoundingClientRect = (element: HTMLElement | null): DOMRect => {
  const defaultRects = { top: 0, left: 0, right: 0, bottom: 0, width: 0, x: 0, y: 0, height: 0, toJSON: () => {} }
  if (!element) return defaultRects

  const rectObject = element.getBoundingClientRect()
  return rectObject
}

export { findIconByLabel, getBoundingClientRect, extractExtension, extensionToLanguage, SUPPORTED_LANGUAGES }
