import { parse_tile, tile2img_data, type color_map } from '@8kb/tile'
import { divide } from '@8kb/bit.io'

type file_change_listener = (img_data: ImageData) => void

const color_map: color_map = {
  0: [0,0,0,0],
  1: [237,159,35,255],
  2: [182,48,32,255],
  3: [107,109,0,255],
}

export
class File_input {
  #listeners: file_change_listener[] = []
  #input: HTMLInputElement

  constructor() {
    const file_input = document.createElement('input')
    this.#input = file_input

    file_input.onchange = async () => {
      const file = file_input.files?.[0]
      if (!file) return

      const tiles = parse_tile(await file.arrayBuffer())
      const row_length = 16 // 每行放 16 个 tile

      const img_data = tile2img_data({
        width: 8 * row_length,
        height: tiles.length / row_length * 8,
        tiles: tiles.map((data, i) => {
          const [quotient, remainder] = divide(i, row_length)
          return ({
            data,
            x: remainder * 8,
            y: quotient * 8,
            color_map,
          })
        })
      })

      this.#listeners.forEach(l => l(img_data))
    }
  }

  listen(listener: file_change_listener) {
    this.#listeners.push(listener)
  }

  select() {
    this.#input.click()
  }
}
