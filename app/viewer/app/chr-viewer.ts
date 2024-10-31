import { File_input } from './mods/file-input'
import { type Showcase, register as register_ppz_showcase } from './mods/showcase'

register_ppz_showcase()

export
class CHR_viewer extends HTMLElement {
  #file_input: File_input
  #showcase: Showcase

  constructor() {
    super()
    this.#showcase = document.createElement('ppz-showcase') as Showcase
    this.#file_input = new File_input()
    this.#file_input.listen(img_data => {
      this.#showcase.set_img_data(img_data)
    })

    const sr = this.attachShadow({ mode: 'closed' })
    sr.appendChild(this.#showcase)
  }
}
