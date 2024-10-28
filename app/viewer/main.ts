import { parse_8kb } from '@8kb/parse'
import { tile2canvas, type color_map } from '@8kb/render'
import { divide } from 'bit-reader'

const canvas = document.querySelector('canvas')!
const canvas_ctx = canvas.getContext('2d')!
const file_input = document.getElementById('file-input')!

const color_map: color_map = {
  0: [0,0,0,0],
  1: [237,159,35,255],
  2: [182,48,32,255],
  3: [107,109,0,255],
}

file_input.onchange = async function(evt) {
  // @ts-ignore
  const file: File | undefined = evt.target.files[0]
  if (!file) return

  const tiles = parse_8kb(await file.arrayBuffer())

  const row_length = 16
  canvas.width = row_length * 8
  canvas.height = tiles.length / row_length * 8

  for (let i=0; i<tiles.length; i++) {
    const [quotient, remainder] = divide(i, row_length)
    tile2canvas({
      dx: remainder * 8,
      dy: quotient * 8,
      color_map,
      ctx: canvas_ctx,
      tile: tiles[i],
    })
  }
}
