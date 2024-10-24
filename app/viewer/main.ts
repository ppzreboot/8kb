import { render_tile, type color_map } from '@8kb/render'

const canvas = document.querySelector('canvas')!
const canvas_ctx = canvas.getContext('2d')!

const color_map: color_map = {
  0: [0,0,0,0],
  1: [255,0,0,255],
  2: [0,255,0,255],
  3: [0,0,255,255],
}

render_tile({
  dx: 0,
  dy: 0,
  color_map,
  ctx: canvas_ctx,
  tile: [ // 8 * 8
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 1, 0, 0,
    0, 0, 1, 0, 0, 1, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 1, 0, 0, 1, 0, 0,
    0, 0, 1, 0, 0, 1, 0, 0,
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
})

render_tile({
  dx: 8,
  dy: 0,
  color_map,
  ctx: canvas_ctx,
  tile: [ // 8 * 8
    0, 0, 2, 0, 0, 0, 0, 0,
    0, 0, 2, 0, 0, 0, 0, 0,
    0, 0, 2, 0, 0, 2, 0, 0,
    0, 0, 2, 0, 2, 0, 0, 0,
    0, 0, 2, 2, 0, 0, 0, 0,
    0, 0, 2, 0, 2, 0, 0, 0,
    0, 0, 2, 0, 0, 2, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
})

render_tile({
  dx: 16,
  dy: 0,
  color_map,
  ctx: canvas_ctx,
  tile: [ // 8 * 8
    0, 0, 3, 0, 0, 0, 0, 0,
    0, 0, 3, 0, 0, 0, 0, 0,
    0, 0, 3, 0, 0, 0, 0, 0,
    0, 0, 3, 3, 3, 0, 0, 0,
    0, 0, 3, 0, 0, 3, 0, 0,
    0, 0, 3, 0, 0, 3, 0, 0,
    0, 0, 3, 3, 3, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0,
  ],
})

const img = document.getElementById('preview') as HTMLImageElement
img.src = canvas.toDataURL()
