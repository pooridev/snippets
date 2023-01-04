import { Box } from '@chakra-ui/react'
import React, { useRef } from 'react'

import Navbar from '@components/shared/navbar'
import Sidebar from '@components/shared/sidebar'
import CodeEditorWrapper from '@components/code-editor-wrapper'

function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      <Box display='flex' justifyContent='center' alignItems='center' as='main'>
        <CodeEditorWrapper />
      </Box>
    </React.Fragment>
  )
}

export default Home
