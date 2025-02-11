import { useRef, useEffect } from 'react'
import { download_chr, extract_chr, cook_tile, extract_raw_tile, render_tile } from '@8kb/tile'
import { app_file_meta } from '../../../ss/ctx'

export
function NES_page() {
  const meta = app_file_meta.useCTX()
  return <div>
    <Meta />
    {meta.ua[5] !== 0 &&
      <>
        <Download />
        <FirstTile />
      </>
    }
  </div>
}

function Meta() {
  const meta = app_file_meta.useCTX()

  return <div>
    <h3>File Meta</h3>
    <ul>
      <li>
        {meta.name}
      </li>
      <li>
        <label>size in header</label>
        <ul>
          <li>prg: {meta.ua[4]} * 16kb</li>
          <li>chr: {meta.ua[5]} * 8kb</li>
        </ul>
      </li>
      <li>
        <label>rom size</label>
        <ul>
          <li>full: {meta.size} bytes</li>
          <li>no header: {meta.size} - 16 = {meta.size - 16} bytes</li>
          <li>no header: ({meta.size} - 16) / 1024 = {(meta.size - 16) / 1024} kb</li>
        </ul>
      </li>
    </ul>
  </div>
}

function Download() {
  const meta = app_file_meta.useCTX()

  return <div>
    <h3>Download</h3>
    <button onClick={() => {
      const [ok, error] = download_chr(meta.ua, meta.name)
      if (!ok)
        alert(error)
    }}>CHR</button>
  </div>
}

function FirstTile() {
  const meta = app_file_meta.useCTX()
  const scale = 16
  const canvas = useCanvas(scale)

  useEffect(() => {
    const tile = cook_tile(
      extract_raw_tile(
        extract_chr(meta.ua),
        0,
      )
    )
    const canvas_ctx = canvas.current!.getContext('2d')!
    canvas_ctx.imageSmoothingEnabled = false
    const img_data = render_tile(tile, {
      0: [0, 0, 0, 0],
      1: [255, 0, 0, 255],
      2: [0, 255, 0, 255],
      3: [0, 0, 255, 255],
    })
    createImageBitmap(img_data).then(img =>
      canvas_ctx.drawImage(
        img,
        0, 0,
        scale * 8,
        scale * 8,
      )
    )
  }, [meta.ua])

  return <div>
    <h3>First Tile</h3>
    <canvas ref={canvas} />
  </div>
}

function useCanvas(scale: number) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = canvas.current!
    const r = window.devicePixelRatio

    c.width = 8 * scale
    c.height = 8 * scale
    c.style.width = 8 * scale / r + 'px'
    c.style.height = 8 * scale / r + 'px'
  }, [])
  return canvas
}