import { scale_img_data } from '@8kb/scale-image-data'

export
function register_showcase() {
  customElements.define('ppz-showcase', Showcase)
}

interface I_canvas_prop {
  readonly instance: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
}

interface I_transform_opts {
  scale: number
  translate: {
    x: number
    y: number
  }
}

export
class Showcase extends HTMLElement {
  #canvas?: I_canvas_prop
  #img_data?: ImageData

  #transform: I_transform_opts = {
    scale: 1,
    translate: {
      x: 0,
      y: 0,
    },
  }

  #rendered: boolean = false

  /** setup: canvas and events */
  resize_canvas(width: number, height: number) {
    const ratio = window.devicePixelRatio
    if (ratio !== 1) {
      this.#canvas!.instance.width = width
      this.#canvas!.instance.height = height
      this.#canvas!.instance.style.width = width / ratio + 'px'
      this.#canvas!.instance.style.height = height / ratio + 'px'
      // this.#canvas!.ctx.scale(ratio, ratio)
    }
  }

  /** setup/update img */
  set_img_data(img_data: ImageData) {
    if (!this.#canvas)
      throw Error('setup canvas first')

    this.#img_data = img_data
    this.render()
  }

  transform(make: (opts: I_transform_opts) => I_transform_opts) {
    this.#transform = make(this.#transform)
    this.render()
  }

  /** cleanup old img, and then rerender with scale */
  render() {
    // 检查组件
    if (!this.#canvas || !this.#img_data)
      throw Error('setup canvas and img_data first')
    // 短引用
    const canvas = this.#canvas.instance
    const canvas_ctx = this.#canvas.ctx
    // cleanup
    if (this.#rendered)
      canvas_ctx.clearRect(0, 0, canvas.width, canvas.height)
    else
      this.#rendered = true
    // 准备数据
    const cloned = scale_img_data(this.#img_data, this.#transform.scale)
    // 计算位置
    const calc_start = (container: number, content: number, translate: number) =>
      Math.floor(
        (content >= container
          ? 0
          : (container - content) / 2
        ) + translate
      )
    // render
    canvas_ctx.putImageData(
      cloned,
      calc_start(canvas.width, cloned.width, this.#transform.translate.x),
      calc_start(canvas.height, cloned.height, this.#transform.translate.y),
    )
  }

  connectedCallback() {
    /* setup dom */
    const shadow_root = this.attachShadow({ mode: 'closed' })
    const instance = document.createElement('canvas')
    const ctx = instance.getContext('2d')!
    this.#canvas = { instance, ctx }
    shadow_root.appendChild(instance)
    
    this.setup_events()
  }

  private setup_events() {
    const canvas = this.#canvas!.instance

    const listen = (
      event: 'mousedown' | 'mouseup' | 'mouseleave' | 'mouseout' | 'mousemove',
      cb: (evt: MouseEvent) => void,
    ) => {
      canvas.addEventListener(event, cb)
    }

    let dragging = false
    listen('mousedown', () => dragging = true)
    listen('mouseup', () => dragging = false)
    listen('mouseleave', () => dragging = false)
    listen('mouseout', () => dragging = false)
    listen('mousemove', evt => {
      if (dragging) {
        this.#transform.translate.x += evt.movementX
        this.#transform.translate.y += evt.movementY
        this.render()
      }
    })
  }
}

