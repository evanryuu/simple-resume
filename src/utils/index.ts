export function generateRandomId(length: number): string {
  const characters = '0123456789'
  const charactersLength = characters.length
  let randomId = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength)
    randomId += characters.charAt(randomIndex)
  }

  return randomId
}

export function downloadJSON(filename: string, data: any) {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function moveArrayElement<T>(arr: T[], index: number, step: number): void {
  if (index < 0 || index >= arr.length) {
    console.error('Invalid index')
    return
  }

  const newIndex = index + step
  if (newIndex < 0 || newIndex >= arr.length) {
    console.error('Invalid step')
    return
  }

  const element = arr.splice(index, 1)[0]
  arr.splice(newIndex, 0, element)
}
