import { render } from './render'

const input = document.getElementById('file-input') as HTMLInputElement
const canvas = document.getElementById('display') as HTMLCanvasElement
set_canvas_size(canvas)
const canvas_ctx = canvas.getContext('2d')!

input.addEventListener('change', async () => {
  const data = await input.files![0].arrayBuffer()
  render(canvas_ctx, new Uint8Array(data))
})

function set_canvas_size(canvas: HTMLCanvasElement) {
  const ratio = window.devicePixelRatio
  if (ratio !== 1) {
    canvas.width = canvas.clientWidth * ratio
    canvas.height = canvas.clientHeight * ratio
  }
}
