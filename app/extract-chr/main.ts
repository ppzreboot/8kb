import { download_chr } from '@8kb/extract/chr/browser'

const file_input = document.getElementById('nes-file-input') as HTMLInputElement
file_input.addEventListener('change', async () => {
  const file = file_input.files![0]
  download_chr(file)
})
