import { parse_tile, tile2img_data, type color_map } from '@8kb/tile'
import { divide } from '@8kb/bit.io'
import { register_showcase, type Showcase } from '@8kb/showcase'
import { scale_img_data } from '@8kb/scale-image-data'

register_showcase()

const color_map: color_map = {
  0: [0,0,0,0],
  1: [237,159,35,255],
  2: [182,48,32,255],
  3: [107,109,0,255],
}

function main() {
  const file_input = document.getElementById('file-input')! as HTMLInputElement
  const scale_input = document.getElementById('scale-input')! as HTMLInputElement
  const showcase = document.querySelector('ppz-showcase') as Showcase

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

    showcase.resize_canvas(img_data.width * scale, img_data.height * scale)
    showcase.set_img_data(
      scale_img_data(img_data, scale)
    )
  }
}
main()

