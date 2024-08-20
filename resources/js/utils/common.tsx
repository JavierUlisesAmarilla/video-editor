// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toChunk = (array: any[], chunkSize: number) => {
  const arr = []

  while (array.length > 0) {
    const chunk = array.splice(0, chunkSize)
    arr.push(chunk)
  }

  return arr
}
