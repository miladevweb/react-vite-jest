import Home from '@/pages/home'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

describe('Home Page', () => {
  beforeEach(() => render(<Home />))

  it('renders button hero section', () => {
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should have written GET_BACK', () => {
    expect(screen.getByText('GET_BACK')).toBeInTheDocument()
  })

  it('should have written GO_AHEAD', async () => {
    const button = screen.getByRole('button')
    userEvent.click(button)

    const goAhead = await screen.findByText('GO_AHEAD')
    expect(goAhead).toBeInTheDocument()
  })
})
