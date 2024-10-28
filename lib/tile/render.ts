import type { color_8kb, tile } from './common'
import { scale_tile } from './scale'

type RenderingContext = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D
type color_web = [number, number, number, number]
export
type color_map = Record<color_8kb, color_web>

export
interface I_render_tile_opts {
  tile: tile
  ctx: RenderingContext
  color_map: color_map
  dx: number
  dy: number

  scale?: number
}
export
function tile2canvas(opts: I_render_tile_opts) {
  opts.scale ??= 1
  const tile = opts.scale !== 1
    ? scale_tile(opts.tile, opts.scale)
    : opts.tile
  const pixels = tile
    .map(tile_row => [
      tile_row
    ])
    .flat()
    .flat()
    .map(color_8kb => opts.color_map[color_8kb])
  const data = new Uint8ClampedArray(pixels.flat())
  const image_data = new ImageData(data, 8 * opts.scale, 8 * opts.scale)
  opts.ctx.putImageData(image_data, opts.dx, opts.dy)
}

export
function tile2png() {

}
