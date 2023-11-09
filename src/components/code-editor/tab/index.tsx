import styled from '@emotion/styled'
import { Box, theme } from '@chakra-ui/react'
import { useState } from 'react'
import { rem } from 'polished'

import { TabData } from '@components/code-editor/types'
import { AddIcon, CloseIcon, JSXIcon } from '@components/shared/icons'
import { findIconByLabel } from '@components/code-editor/utils'
import Button from '@components/shared/button'

const Tab = () => {
  const [tab, setTab] = useState<TabData | null>({
    label: 'app.jsx',
    icon: <JSXIcon />,
  })

  const hasTab = Boolean(tab)
  const ExtensionIcon = () => tab?.icon || null

  const handleFileNameChange = (newFileName: string) => {
    setTab({
      icon: findIconByLabel(newFileName),
      label: newFileName.trim(),
    })
  }

  const deleteTab = () => {
    setTab(null)
  }

  const addNewTab = () => {
    setTab({
      label: '',
      icon: null,
    })
  }

  const deleteOrAdd = () => {
    if (hasTab) deleteTab()
    else addNewTab()
  }

  return (
    <Box
      borderTopLeftRadius='6px'
      borderTopRightRadius='6px'
      h={hasTab ? '90%' : '26px'}
      alignSelf={hasTab ? 'end' : 'center'}
      bg={hasTab ? 'rgb(34, 39, 46)' : 'transparent'}
      display='flex'
      color='white'
      alignItems='center'
    >
      <Box mx={hasTab ? 4 : 1.5} h='100%' display='flex' alignItems='center'>
        {hasTab && <ExtensionIcon />}
        {hasTab && (
          <Input
            placeholder='untitled'
            onChange={({ target }) => handleFileNameChange(target.value)}
            value={tab?.label}
            spellCheck='false'
          />
        )}
        <Button
          _hover={{ background: 'rgba(255, 255, 255, 0.08)' }}
          _active={{ background: 'rgba(255, 255, 255, 0.08)' }}
          minWidth={1}
          width={5}
          height={5}
          p={0}
          borderRadius='full'
          bg='transparent'
          onClick={deleteOrAdd}
        >
          {hasTab ? (
            <CloseIcon width={theme.space[3.5]} height={theme.space[3.5]} />
          ) : (
            <AddIcon width={theme.space[3.5]} height={theme.space[3.5]} />
          )}
        </Button>
      </Box>
    </Box>
  )
}

const Input = styled('input')`
  all: unset;
  outline: 0;
  max-width: ${rem(53)};
  margin-left: ${rem(8)};
  color: rgba(255, 255, 255, 0.8);
  min-height: ${rem(19)};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  font-size: ${rem(15)};
`

export default Tab
