import { useState, useEffect } from 'react'

export function useTheme() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('dark-mode')
    if (stored !== null) return stored === 'true'
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.body.classList.toggle('dark-mode', dark)
    localStorage.setItem('dark-mode', dark)
  }, [dark])

  const toggle = () => setDark(prev => !prev)

  return { dark, toggle }
}
