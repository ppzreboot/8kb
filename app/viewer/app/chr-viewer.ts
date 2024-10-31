import { Showcase } from './mods/showcase'
import { file2img } from './mods/file2img'
import { Palette } from './mods/palette'
import { Menu } from './mods/menu'

customElements.define('ppz-showcase', Showcase)
customElements.define('ppz-palette', Palette)
customElements.define('ppz-menu', Menu)

export
class CHR_viewer extends HTMLElement {
  constructor() {
    super()
    const showcase = document.createElement('ppz-showcase') as Showcase
    const palette = document.createElement('ppz-palette') as Palette
    const menu = document.createElement('ppz-menu') as Menu

    const file_input = document.createElement('input')
    file_input.type = 'file'
    file_input.onchange = async () => {
      const file = file_input.files?.[0]
      if (file) {
        if (!menu.set_selected())
          sr.appendChild(showcase)
        showcase.set_img_data(
          await file2img(file, palette.get_value())
        )
      }
    }

    menu.listen('select_file', () => file_input.click())

    const sr = this.attachShadow({ mode: 'closed' })
    sr.appendChild(palette)
    sr.appendChild(menu)
  }
}
