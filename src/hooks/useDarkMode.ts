import { useAppStore } from '@/store'

import useLocalStorage from './useLocalStorage'

const html = document.documentElement

const useDarkMode: () => [boolean, (mode: boolean) => void] = () => {
  const appStore = useAppStore()
  const [darkMode, setDarkMode] = useLocalStorage('dark_mode', false)
  html.setAttribute('theme', darkMode ? 'dark' : 'light')
  const handleDarkChange = (mode: boolean) => {
    setDarkMode(mode)
    appStore.setDarkMode(mode)
    html.setAttribute('theme', mode ? 'dark' : 'light')
  }

  return [darkMode, handleDarkChange]
}

export default useDarkMode
