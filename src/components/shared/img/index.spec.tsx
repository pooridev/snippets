import { render, screen } from '@testing-library/react'

import { Img, placeholderImg } from './index'

describe('<Img />', () => {
  test('should render an img element with correct alt text', () => {
    render(<Img src='/assets/logos/logo.webp' alt='logo' />)

    expect(screen.getByAltText('logo')).toBeInTheDocument()
  })

  test('should render a placeholder img when no src has been passed', () => {
    render(<Img alt='logo' />)

    const logoElement = screen.getByAltText('logo')
    expect(logoElement).toHaveAttribute('src', placeholderImg)
  })
})
