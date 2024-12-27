// import { read_bit } from '@8kb/bit.io'

function listen_file_change() {
  const file_input = document.getElementById('nes-file-input') as HTMLInputElement
  file_input.addEventListener('change', async () => {
    const file = file_input.files![0]
    split(await file.arrayBuffer())
  })
}

function split(array_buffer: ArrayBuffer) {
  const nes = new Uint8Array(array_buffer)
  const tr = document.createElement('tr')
  const start = 0
  for (let i=start; i<start + 16; i++) {
    const td = document.createElement('td')
    td.innerHTML = nes[i] + ''
    tr.appendChild(td)
  }
  document.querySelector('tbody')!.appendChild(tr)
}

listen_file_change()
