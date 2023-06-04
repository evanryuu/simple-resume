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
      <Icon
        style={{
          display: darkMode ? 'none' : '',
        }}
        icon="ic:outline-light-mode"
      />
      <Icon
        style={{
          display: darkMode ? '' : 'none',
        }}
        icon="ic:outline-dark-mode"
      />
    </span>
  )
}

export default DarkModeSwitcher
