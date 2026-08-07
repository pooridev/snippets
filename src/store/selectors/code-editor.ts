import { DefaultValue, selector } from 'recoil'

import { SnippetFile } from '@components/code-editor/types'
import { DEFAULT_FILES } from '@components/code-editor/constants'
import { extensionToLanguage, extractExtension } from '@components/code-editor/utils'
import { findSyntaxTheme } from '@components/code-editor/themes'
import { activeFileId, editorPosition, files, syntaxTheme } from '@store/atoms/code-editor'

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

export const activeFile = selector<SnippetFile>({
  key: 'active-file',
  get: ({ get }) => {
    const allFiles = get(files)
    const currentId = get(activeFileId)
    return allFiles.find(file => file.id === currentId) || allFiles[0] || DEFAULT_FILES[0]
  },
})

const updateActiveFile = (allFiles: SnippetFile[], currentId: string, patch: Partial<SnippetFile>) => {
  const targetId = allFiles.some(file => file.id === currentId) ? currentId : allFiles[0]?.id
  return allFiles.map(file => (file.id === targetId ? { ...file, ...patch } : file))
}

export const activeFileCode = selector<string>({
  key: 'active-file-code',
  get: ({ get }) => get(activeFile).code,
  set: ({ get, set }, newCode) => {
    if (newCode instanceof DefaultValue) return
    set(files, updateActiveFile(get(files), get(activeFileId), { code: newCode }))
  },
})

/** Explicit language override of the active file; empty string means "auto-detect". */
export const activeFileLanguage = selector<string>({
  key: 'active-file-language',
  get: ({ get }) => get(activeFile).language || '',
  set: ({ get, set }, newLanguage) => {
    if (newLanguage instanceof DefaultValue) return
    set(files, updateActiveFile(get(files), get(activeFileId), { language: newLanguage || null }))
  },
})

/** The Prism language actually used for highlighting the active file. */
export const resolvedLanguage = selector({
  key: 'resolved-language',
  get: ({ get }) => {
    const file = get(activeFile)
    return file.language || extensionToLanguage(extractExtension(file.name)) || 'javascript'
  },
})

export const currentSyntaxTheme = selector({
  key: 'current-syntax-theme',
  get: ({ get }) => findSyntaxTheme(get(syntaxTheme)),
})
