import { Showcase as Base } from '@8kb/showcase'

export
class Showcase extends Base {
  constructor() {
    super()
    this.resize_canvas(
      document.body.clientWidth * (devicePixelRatio || 1),
      document.body.clientHeight * (devicePixelRatio || 1),
    )
  }
}

export
function register() {
  customElements.define('ppz-showcase', Showcase)
}
