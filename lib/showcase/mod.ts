import { scale_img_data } from '@8kb/scale-image-data'

export
function register_showcase() {
  customElements.define('ppz-showcase', Showcase)
}

interface I_canvas_prop {
  readonly instance: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
}

interface I_render_opts {
  scale?: number
  translate?: {
    x?: number
    y?: number
  }
}

export
class Showcase extends HTMLElement {
  #canvas?: I_canvas_prop
  #img_data?: ImageData

  #scale: number = 1
  #translate: { x: number, y: number } = { x: 0, y: 0 }
  #rendered: boolean = false

  /** setup: canvas and events */
  setup(width: number, height: number) {
    this.#canvas = setup_canvas(width, height)
    setup_events(this)
    this.shadowRoot!.appendChild(this.#canvas.instance)
  }

  /** setup/update img */
  set_img_data(img_data: ImageData) {
    if (!this.#canvas)
      throw Error('setup canvas first')

    this.#img_data = img_data
    this.render_img_data()
  }

  /** cleanup old img, and then rerender with scale */
  render_img_data(opts?: I_render_opts) {
    // 检查组件
    if (!this.#canvas || !this.#img_data)
      throw Error('setup canvas and img_data first')
    // 更新状态
    if (opts?.scale)
      this.#scale = opts.scale
    if (opts?.translate) {
      if (opts.translate.x)
        this.#translate.x = opts.translate.x
      if (opts.translate.y)
        this.#translate.y = opts.translate.y
    }
    // cleanup
    if (this.#rendered)
      {} // TODO
    else
      this.#rendered = true
    // 准备数据
    const cloned = scale_img_data(this.#img_data, this.#scale)
    // 计算位置
    const calc_start = (container: number, content: number) =>
      content >= container
        ? 0
        : Math.floor(
          (container - content) / 2
        )
    // render
    this.#canvas.ctx.putImageData(
      cloned,
      calc_start(this.#canvas.instance.width, cloned.width) + this.#translate.x,
      calc_start(this.#canvas.instance.height, cloned.height) + this.#translate.y,
    )
  }

  connectedCallback() {
    this.attachShadow({ mode: 'closed' })
  }
}

function setup_canvas(width: number, height: number) {
  const instance = document.createElement('canvas')
  const ctx = instance.getContext('2d')!

  const ratio = window.devicePixelRatio
  if (ratio) {
    instance.width = width * ratio
    instance.height = height * ratio
    instance.style.width = width + 'px'
    instance.style.height = height + 'px'
    ctx.scale(ratio, ratio)
  }

  return { instance, ctx }
}
function setup_events(showcase: Showcase) {
}
