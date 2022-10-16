import { useState, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import { AnimatePresence, motion, MotionProps } from 'framer-motion'

import Tab from './tab'
import { initialTabs } from '../constants'
import { WindowButtonsIcon } from '@components/icons'
import styled from '@emotion/styled'
import { rem } from 'polished'

const CodeEditor = () => {
  const [tabs, setTabs] = useState(initialTabs)
  const selectedTab = useRef(tabs[0])

  return (
    <Wrapper>
      <Header>
        <WindowButtonsIcon className='windowButton' />
        <Tab onRemove={() => {}} activeTab={selectedTab.current} />
      </Header>
      <AnimatePresence exitBeforeEnter>
        <Box
          pt={4}
          pb={6}
          color='white'
          as={motion.div}
          key={selectedTab ? selectedTab.current.label : 'empty'}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.15 } as any}
        >
          <code>{selectedTab ? selectedTab.current.code : '😋'}</code>
        </Box>
      </AnimatePresence>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
  background: rgb(34, 39, 46);
  max-width: 500px;
  max-height: 350px;
  overflow: hidden;
  border-radius: ${rem(20)};
  opacity: 0.5;
  padding-inline: ${rem(10)};
  box-shadow: rgb(60 64 67 / 30%) 0px 1px 2px 0px, rgb(60 64 67 / 15%) 0px 2px 6px 2px;
`

const Header = styled(Box)`
  display: flex;
  height: ${rem(44)};
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  gap: ${rem(10)};
`

export default CodeEditor
