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
