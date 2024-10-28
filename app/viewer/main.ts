import { parse_tile, tile2canvas, type color_map } from '@8kb/tile'
import { divide } from '@8kb/bit.io'

const canvas = document.querySelector('canvas')!
const canvas_ctx = canvas.getContext('2d')!
const file_input = document.getElementById('file-input')! as HTMLInputElement
const scale_input = document.getElementById('scale-input')! as HTMLInputElement

const color_map: color_map = {
  0: [0,0,0,0],
  1: [237,159,35,255],
  2: [182,48,32,255],
  3: [107,109,0,255],
}

file_input.onchange = render
scale_input.oninput = render

async function render() {
  let scale = Number(scale_input.value)
  if (!(Number.isInteger(scale) && scale > 0)) {
    console.error('Scale must be a positive integer')
    scale = 1
  }

  // @ts-ignore
  const file: File | undefined = file_input.files[0]
  if (!file) return

  const tiles = parse_tile(await file.arrayBuffer())
  const row_length = 16
  canvas.width = row_length * 8 * scale
  canvas.height = tiles.length * scale / row_length * 8

  for (let i=0; i<tiles.length; i++) {
    const [quotient, remainder] = divide(i, row_length)
    tile2canvas({
      dx: remainder * 8 * scale,
      dy: quotient * 8 * scale,
      color_map,
      ctx: canvas_ctx,
      tile: tiles[i],

      scale,
    })
  }
}
