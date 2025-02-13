import { render_tile } from '@8kb/render-tile'
import './global.css'

const scale = 50
const width = 5
const height = 6
const full_width = width * scale
const full_height = height * scale

// prepare a canvas
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
canvas.width = full_width
canvas.height = full_height
canvas.style.width = full_width / window.devicePixelRatio + 'px'
canvas.style.height = full_height / window.devicePixelRatio + 'px'
/** getContext !!after!! setting up canvas */
const ctx = canvas.getContext('2d')!
ctx.imageSmoothingEnabled = false

main()

async function main() {
  // make a 5x6 tanvas
  const tanvas_data = new Uint8ClampedArray([
    255,0,0,255,  0,0,0,0,    0,0,0,0,    0,0,0,0,    0,255,0,255,
    0,0,0,0,      0,0,0,0,    0,0,0,0,    0,0,0,0,    0,0,0,0,
    0,0,0,0,      0,0,0,0,    0,0,0,0,    0,0,0,0,    0,0,0,0,
    0,0,0,0,      0,0,0,0,    0,0,0,0,    0,0,0,0,    0,0,0,0,
    0,0,0,0,      0,0,0,0,    0,0,0,0,    0,0,0,0,    0,0,0,0,
    0,0,255,255,  0,0,0,0,    0,0,0,0,    0,0,0,0,    255,255,255,255,
  ])
  const tanvas = new ImageData(tanvas_data, 5, 6)

  // make a 3x2 tile
  const tile_data = new Uint8ClampedArray([
    255,255,0,255,   0,0,0,0,   0,0,0,0,
    0,0,0,0,       0,0,0,0,     255,0,255,255,
  ])
  const tile = new ImageData(tile_data, 3, 2)

  // render the tile at 1,2
  render_tile({
    tile_canvas: tanvas,
    tile,
    position: {
      x: 1, y: 2,
    }
  })

  // draw the tanvas
  const img_bitmap = await createImageBitmap(tanvas)
  ctx.drawImage(img_bitmap, 0, 0, full_width, full_height)
}
