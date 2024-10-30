import { parse_tile, tile2img_data, type color_map } from '@8kb/tile'
import { divide } from '@8kb/bit.io'
import type { Showcase } from '@8kb/showcase'

const color_map: color_map = {
  0: [0,0,0,0],
  1: [237,159,35,255],
  2: [182,48,32,255],
  3: [107,109,0,255],
}

export
class CHR_viewer extends HTMLElement {
  constructor() {
    super()

    const showcase = make_showcase()
    const file_input = make_file_input()
    file_input.onchange(img_data => {
      showcase.set_img_data(img_data)
    })

    const sr = this.attachShadow({ mode: 'closed' })
    sr.appendChild(showcase)
  }
}

function make_showcase() {
  const showcase = document.createElement('ppz-showcase') as Showcase
  showcase.resize_canvas(
    document.body.clientWidth * (devicePixelRatio || 1),
    document.body.clientHeight * (devicePixelRatio || 1),
  )
  return showcase
}

type file_change_listener = (img_data: ImageData) => void
function make_file_input() {
  const listeners: file_change_listener[] = []

  const file_input = document.createElement('input')
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

    listeners.forEach(l => l(img_data))
  }

  return {
    select() {
      file_input.click()
    },
    onchange(listener: file_change_listener) {
      listeners.push(listener)
    },
  }
}
