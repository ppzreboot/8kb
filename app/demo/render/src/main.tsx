import { render_tile, make_offscreen_canvas, render_px, scale_img } from '@8kb/render'
import './global.css'

const scale = 50
const width = 5
const height = 6
const full_width = width * scale
const full_height = height * scale
const canvas_ctx = prepare_canvas()

main()

async function main() {
  // make a 5x6 image
  const [ocanvas, ocanvas_ctx] = make_offscreen_canvas(5, 6)
  render_px(ocanvas_ctx, 0, 0, [255,0,0,255])
  render_px(ocanvas_ctx, 4, 0, [0,255,0,255])
  render_px(ocanvas_ctx, 0, 5, [0,0,255,255])
  render_px(ocanvas_ctx, 4, 5, [255,255,255,255])

  // make a 3x2 tile
  const tile_data = new Uint8ClampedArray([
    255,255,0,255,   0,0,0,0,
    0,0,0,0,         255,0,255,255,
  ])
  const tile = new ImageData(tile_data, 2, 2)

  // render the tile at 1,2
  render_tile(ocanvas_ctx, tile, 1, 2)

  // scale
  const scaled = scale_img(ocanvas, full_width, full_height)

  canvas_ctx.drawImage(scaled.canvas, 0, 0)
}

function prepare_canvas() {
  const canvas = document.createElement('canvas')
  document.body.appendChild(canvas)
  canvas.width = full_width
  canvas.height = full_height
  canvas.style.width = full_width / window.devicePixelRatio + 'px'
  canvas.style.height = full_height / window.devicePixelRatio + 'px'
  /** getContext !!after!! setting up canvas */
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false

  return ctx
}
