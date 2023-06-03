import React from 'react'

import { Icon } from '@iconify/react'

import useDarkMode from '@/hooks/useDarkMode'

const DarkModeSwitcher: React.FC<{ className?: string }> = (props) => {
  const { className } = props
  const [darkMode, setDarkMode] = useDarkMode()
  return (

    <span
      className={className}
      onClick={() => setDarkMode(!darkMode)}
      role="presentation"
    >
      <Icon icon={darkMode ? 'ic:outline-dark-mode' : 'ic:outline-light-mode'} />
    </span>
  )
}

export default DarkModeSwitcher
