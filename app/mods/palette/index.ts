import type { color_map } from '@8kb/tile'

export
class Palette extends HTMLElement {
  #value: color_map
  #values: color_map[] = [
    { // Mario
      0: [0,0,0,0],
      1: [237,159,35,255],
      2: [182,48,32,255],
      3: [107,109,0,255],
    },
  ]
  constructor() {
    super()
    this.#value = this.#values[0]
  }

  get_value() {
    return this.#value
  }
}
