import { FC, useState, ChangeEvent } from 'react'

import { TabProps } from '@components/code-editor-wrapper/types'
import { AnimatePresence, Reorder, motion } from 'framer-motion'
import { CloseIcon } from '@components/icons'
import { Box } from '@chakra-ui/react'
import { getIconBasedOnExtension } from '@components/code-editor-wrapper/utils'
import styled from '@emotion/styled'
import { rem } from 'polished'

const Tab: FC<TabProps> = ({ activeTab, onRemove }) => {
  const [fileData, setFileData] = useState<{ label: string; icon: null | JSX.Element }>(() => ({
    label: activeTab.label,
    icon: activeTab.icon,
  }))

  const ExtensionIcon = () => fileData.icon

  return (
    <Reorder.Group onReorder={() => {}} axis='x' values={[activeTab]}>
      <AnimatePresence initial={false}>
        <Box
          as={Reorder.Item}
          display='flex'
          color='white'
          ml={4}
          value={activeTab}
          id={activeTab.label}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.15 },
          }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        >
          <Box as={motion.span} layout='position' display='flex' alignItems='end'>
            <ExtensionIcon />
            <Input
              onChange={({ target }) => {
                setFileData({
                  label: target.value,
                  icon: getIconBasedOnExtension(target.value),
                })
              }}
              value={fileData.label}
            />
            <motion.div layout style={{ display: 'flex', alignSelf: 'stretch', marginTop: 3 }}>
              <motion.button
                onPointerDown={event => {
                  event.stopPropagation()
                  onRemove()
                }}
                initial={false}
              >
                <CloseIcon />
              </motion.button>
            </motion.div>
          </Box>
        </Box>
      </AnimatePresence>
    </Reorder.Group>
  )
}

const Input = styled('input')`
  all: unset;
  outline: 0;
  max-width: ${rem(60)};
  margin-left: ${rem(8)};
`

export default Tab
