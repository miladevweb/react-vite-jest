import { useState } from 'react'

export function Header({ children }: { children: React.ReactNode }) {
  return <header style={{ backgroundColor: 'limegreen', color: '#FFF' }}>{children}</header>
}

/**
 *
 *
 */

export function Button() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <button
      style={{ backgroundColor: 'orangered' }}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {isOpen ? 'GO_AHEAD' : 'GET_BACK'}
    </button>
  )
}

/**
 *
 *
 */

export function Image() {
  return <div>HeroImage</div>
}
