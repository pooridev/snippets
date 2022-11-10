import { screen, waitFor } from '@testing-library/react'

import CodeEditorWrapper from '@components/code-editor-wrapper'

import Alignment from '.'
import render from '../../../../test/renderWithProviders'

const leftAlignLabel = 'Align element left'
const codeEditorLabel = 'code-editor'

describe('<Alignment />', () => {
  test('the code editor should be aligned to the left side if the user clicked on left align button', async () => {
    render(<Alignment />)
    render(<CodeEditorWrapper />)

    screen.getByLabelText(leftAlignLabel).click()

    const codeEditorElement = screen.getByLabelText(codeEditorLabel)

    waitFor(() => expect(codeEditorElement).toHaveStyle({ left: '0%' }))
  })
})
