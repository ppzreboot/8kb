import { I_tile } from './mod'

export
type I_rgba = [number, number, number, number]

export
interface I_palette {
  0: I_rgba
  1: I_rgba
  2: I_rgba
  3: I_rgba
}

/**
 * A pixel is represented by 4 numbers: r, g, b, a.
 * A tile has 8x8 pixels.
 */
export
function render_tile(tile: I_tile, palette: I_palette) {
  const data_arr = new Uint8ClampedArray(8*8*4)
  for (let i=0; i<tile.length; i++)
    [
      data_arr[i * 4],
      data_arr[i * 4 + 1],
      data_arr[i * 4 + 2],
      data_arr[i * 4 + 3],
    ] = palette[tile[i]]

  return new ImageData(data_arr, 8, 8)
}
