import type { color_8kb, tile } from './common'

type color_web = [number, number, number, number]
export
type color_map = Record<color_8kb, color_web>

export
interface I_render_opts {
  width: number
  height: number
  tiles: {
    data: tile
    x: number
    y: number
    color_map: color_map
  }[]
}

export
function tile2img_data(opts: I_render_opts): ImageData {
  const canvas = new OffscreenCanvas(opts.width, opts.height)
  const ctx = canvas.getContext('2d')!

  for (const tile of opts.tiles) {
    const pixels = tile.data
      .map(tile_row => [
        tile_row
      ])
      .flat()
      .flat()
      .map(color_8kb => tile.color_map[color_8kb])
    const data = new Uint8ClampedArray(pixels.flat())
    const image_data = new ImageData(data, 8, 8)
    ctx.putImageData(image_data, tile.x, tile.y)
  }

  return ctx.getImageData(0, 0, opts.width, opts.height)
}

export
function tile2png() {

}
