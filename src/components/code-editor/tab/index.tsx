import styled from '@emotion/styled'
import { Box, theme } from '@chakra-ui/react'
import { rem } from 'polished'
import { useRecoilState, useRecoilValue } from 'recoil'

import { SnippetFile } from '@components/code-editor/types'
import { AddIcon, CloseIcon } from '@components/shared/icons'
import { findIconByLabel } from '@components/code-editor/utils'
import { activeFileId, files } from '@store/atoms/code-editor'
import { currentSyntaxTheme } from '@store/selectors/code-editor'
import Button from '@components/shared/button'

const createFileId = () => `file-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

const Tabs = () => {
  const [allFiles, setFiles] = useRecoilState(files)
  const [currentId, setActiveId] = useRecoilState(activeFileId)
  const syntaxTheme = useRecoilValue(currentSyntaxTheme)

  const renameFile = (id: string, name: string) => {
    setFiles(prev => prev.map(file => (file.id === id ? { ...file, name: name.trim() } : file)))
  }

  const addFile = () => {
    const newFile: SnippetFile = { id: createFileId(), name: 'untitled', code: '', language: null }
    setFiles(prev => [...prev, newFile])
    setActiveId(newFile.id)
  }

  const removeFile = (id: string) => {
    const remaining = allFiles.filter(file => file.id !== id)
    if (remaining.length === 0) return

    setFiles(remaining)
    if (id === currentId) {
      const removedIndex = allFiles.findIndex(file => file.id === id)
      const neighbor = remaining[Math.max(0, removedIndex - 1)]
      setActiveId(neighbor.id)
    }
  }

  return (
    <Box display='flex' alignItems='center' gap={1} h='100%' minWidth={0} overflow='hidden'>
      {allFiles.map(file => {
        const isActive = file.id === currentId
        return (
          <Box
            key={file.id}
            borderTopLeftRadius='6px'
            borderTopRightRadius='6px'
            h='90%'
            alignSelf='end'
            bg={isActive ? syntaxTheme.background : 'transparent'}
            opacity={isActive ? 1 : 0.55}
            _hover={isActive ? undefined : { opacity: 0.85 }}
            cursor={isActive ? 'default' : 'pointer'}
            display='flex'
            alignItems='center'
            px={3}
            onClick={() => setActiveId(file.id)}
            transition='opacity 0.15s ease'
          >
            {findIconByLabel(file.name)}
            <Input
              placeholder='untitled'
              onChange={({ target }) => renameFile(file.id, target.value)}
              value={file.name}
              spellCheck='false'
              readOnly={!isActive}
              style={{ color: syntaxTheme.text, cursor: isActive ? 'text' : 'pointer' }}
            />
            {isActive && allFiles.length > 1 && (
              <Button
                _hover={{ background: syntaxTheme.headerOverlay }}
                _active={{ background: syntaxTheme.headerOverlay }}
                minWidth={1}
                width={5}
                height={5}
                p={0}
                borderRadius='full'
                bg='transparent'
                color='inherit'
                aria-label={`Close ${file.name || 'untitled'}`}
                onClick={event => {
                  event.stopPropagation()
                  removeFile(file.id)
                }}
              >
                <CloseIcon width={theme.space[3.5]} height={theme.space[3.5]} />
              </Button>
            )}
          </Box>
        )
      })}
      <Button
        _hover={{ background: syntaxTheme.headerOverlay }}
        _active={{ background: syntaxTheme.headerOverlay }}
        minWidth={1}
        width={5}
        height={5}
        p={0}
        borderRadius='full'
        bg='transparent'
        color='inherit'
        aria-label='New file'
        onClick={addFile}
      >
        <AddIcon width={theme.space[3.5]} height={theme.space[3.5]} />
      </Button>
    </Box>
  )
}

const Input = styled('input')`
  all: unset;
  outline: 0;
  max-width: ${rem(70)};
  margin-left: ${rem(8)};
  min-height: ${rem(19)};
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${rem(15)};
  background: transparent;
`

export default Tabs
