const file_input = document.getElementById('nes-file-input') as HTMLInputElement

file_input.addEventListener('change', async () => {
  const file = file_input.files![0]
  const buffer = await file.arrayBuffer()
  console.log(buffer.byteLength)
})
