import { useEffect, useMemo, useRef, useState } from 'react'
import { app_file_meta } from '../../../ss/ctx'
import { cook_tile, extract_raw_tiles, I_tile, render_tile } from '@8kb/tile'

export
function CHR_page() {
  const meta = app_file_meta.useCTX()
  const invalid = useMemo(() => {
    if (meta.size > (2 ** 20))
      return 'It seems to be a invalid chr. size: ' + meta.size
  }, [meta])

  return invalid ? invalid : <All_tile ua={meta.ua} />
}

function All_tile({ ua }: { ua: Uint8Array }) {
  const c = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const tiles: ImageData[] = extract_raw_tiles(ua)
      .map(cook_tile)
      .map(tile =>
        render_tile(tile, {
          0: [0,0,0,0],
          1: [0,0,255,255],
          2: [0,255,0,255],
          3: [255,0,0,255],
        })
      )
    render(tiles, c.current!)
  }, [ua])
  return <canvas ref={c} />
}

function render(tiles: ImageData[], real_canvas: HTMLCanvasElement) {
  const length = tiles.length
  const row_length = 16
  const row_num = Math.ceil(length / row_length)
  const width = row_length * 8
  const height = row_num * 8

  // render to a offscreencanvas
  const o_canvas = new OffscreenCanvas(width, height)
  const o_canvas_ctx = o_canvas.getContext('2d')!
  for (let i=0; i<length; i++)
    o_canvas_ctx.putImageData(tiles[i], (i % row_length) * 8, (Math.floor(i / row_length)) * 8)

  // scale info
  const scale = 8
  const scaled_w = width * scale
  const scaled_h = height * scale
  real_canvas.width = scaled_w
  real_canvas.height = scaled_h
  real_canvas.style.width = scaled_w / window.devicePixelRatio + 'px'
  real_canvas.style.height = scaled_h / window.devicePixelRatio + 'px'

  // render to the real canvas
  const real_ctx = real_canvas.getContext('2d')!
  real_ctx.imageSmoothingEnabled = false
  real_ctx.drawImage(o_canvas, 0, 0, scaled_w, scaled_h)
}
