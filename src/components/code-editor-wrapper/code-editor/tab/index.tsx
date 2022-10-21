import styled from '@emotion/styled'
import { Box, theme } from '@chakra-ui/react'
import { useState, memo } from 'react'
import { rem } from 'polished'

import { TabData } from '@components/code-editor-wrapper/types'
import { AddIcon, CloseIcon, JSXIcon } from '@components/shared/icons'
import { getIconBasedOnExtension } from '@components/code-editor-wrapper/utils'
import Button from '@components/shared/button'

const Tab = () => {
  const [tab, setTab] = useState<TabData | null>({
    label: 'app.jsx',
    icon: <JSXIcon />,
  })

  const handleFileNameChange = (newFileName: string) => {
    setTab({
      icon: getIconBasedOnExtension(newFileName),
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

  const ADD_MODE = Boolean(tab)

  const deleteOrAdd = () => {
    if (!ADD_MODE) addNewTab()
    else deleteTab()
  }

  const ExtensionIcon = () => tab?.icon!
  return (
    <Box
      borderTopLeftRadius='6px'
      borderTopRightRadius='6px'
      h={ADD_MODE ? '90%' : '26px'}
      alignSelf={ADD_MODE ? 'end' : 'center'}
      bg={ADD_MODE ? 'rgb(34, 39, 46)' : 'transparent'}
      // flex='1'
      display='flex'
      color='white'
      alignItems='center'
    >
      <Box mx={ADD_MODE ? 4 : 1.5} h='100%' display='flex' alignItems='center'>
        {ADD_MODE && <ExtensionIcon />}
        {ADD_MODE && (
          <Input
            placeholder='untitled'
            onChange={({ target }) => handleFileNameChange(target.value)}
            value={tab?.label}
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
          {ADD_MODE && <CloseIcon width={theme.space[3.5]} height={theme.space[3.5]} />}
          {!ADD_MODE && <AddIcon width={theme.space[3.5]} height={theme.space[3.5]} />}
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

export default memo(Tab)
