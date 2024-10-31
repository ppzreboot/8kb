import { type Showcase } from './mods/showcase'
import { file2img } from './mods/file2img'
import { Palette } from './mods/palette'

export
class CHR_viewer extends HTMLElement {
  constructor() {
    super()
    const showcase = document.createElement('ppz-showcase') as Showcase
    const palette = document.createElement('palette') as Palette

    const file_input = document.createElement('input')
    file_input.onchange = async () => {
      const file = file_input.files?.[0]
      if (file)
        showcase.set_img_data(
          await file2img(file, palette.get_value())
        )
    }

    const sr = this.attachShadow({ mode: 'closed' })
    sr.appendChild(showcase)
    sr.appendChild(palette)
  }
}
