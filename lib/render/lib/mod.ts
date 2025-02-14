export
type I_canvas = OffscreenCanvas | HTMLCanvasElement

export
type I_canvas_ctx = OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D

export
type I_color = [number, number, number, number]

export
function make_offscreen_canvas(width: number, height: number):
[OffscreenCanvas, OffscreenCanvasRenderingContext2D] {
  const canvas = new OffscreenCanvas(width, height)
  const ctx = canvas.getContext('2d')!
  ctx.imageSmoothingEnabled = false
  return [canvas, ctx]
}

export
function render_px(canvas: I_canvas_ctx, x: number, y: number, color: I_color) {
  const img = new ImageData(new Uint8ClampedArray(color), 1, 1)
  canvas.putImageData(img, x, y)
}

export
function render_tile(canvas: I_canvas_ctx, tile: ImageData, x: number, y: number) {
  canvas.putImageData(tile, x * tile.width, y * tile.height)
}

export
function scale_img(img: I_canvas | ImageData, w: number, h: number) {
  if (img instanceof ImageData) {
    const new_img = new OffscreenCanvas(img.width, img.height)
    const ctx = new_img.getContext('2d')!
    ctx.putImageData(img, 0, 0)
    img = new_img
  }

  const scaled = new OffscreenCanvas(w, h)
  const scaled_ctx = scaled.getContext('2d')!
  scaled_ctx.imageSmoothingEnabled = false
  scaled_ctx.drawImage(img, 0, 0, w, h) // make use of the auto scaling of `drawImage`

  return {
    canvas: scaled,
    img_data: () =>
      scaled_ctx.getImageData(0, 0, w, h)
    ,
  }
}
