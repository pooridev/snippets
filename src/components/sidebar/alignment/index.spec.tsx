import { screen, waitFor } from '@testing-library/react'

import CodeEditor from '@components/code-editor'

import Alignment from '.'
import render from '../../../test/renderWithProviders'

const leftAlignLabel = 'Align element left'
const codeEditorLabel = 'code-editor'

describe('<Alignment />', () => {
  test('the code editor should be aligned to the left side if the user clicked on left align button', async () => {
    render(
      <>
        <Alignment />
        <CodeEditor />
      </>
    )

    screen.getByLabelText(leftAlignLabel).click()

    const codeEditorElement = screen.getByLabelText(codeEditorLabel)

    await waitFor(() => expect(codeEditorElement).toHaveStyle({ left: '0%' }))
  })
})
