import { useRef, useEffect, useState } from 'react'
import { validate_nes, extract_chr, cook_tile, extract_raw_tile, render_tile } from '@8kb/tile'
import { app_file_meta } from '../../../ss/ctx'
import { I_nes_file, nes_file } from '../ss/ctx'

export
function NES_page() {
  const meta = app_file_meta.useCTX()

  const [parsed, set_parsed] = useState<[string, null] | [null, I_nes_file]>()
  useEffect(() => {
    const rom_error = validate_nes(meta.ua)
    if (rom_error !== null) {
      set_parsed(['invalid rom: ' + rom_error, null])
      return
    }

    const _tmp: I_nes_file = { ...meta }
    if (meta.ua[5] !== 0)
      _tmp.chr = extract_chr(meta.ua)
    set_parsed([null, _tmp])
  }, [meta])

  if (parsed === undefined)
    return <div>parsing</div>

  const [error, _nes_file] = parsed
  return error !== null // try removing the "!== null"
    ? <div>{error}</div>
    : <nes_file.Provider value={_nes_file}>
      <div>
        <Meta />
          <Download />
          <FirstTile />
      </div>
    </nes_file.Provider>
}

function Meta() {
  const meta = nes_file.useCTX()

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
  const meta = nes_file.useCTX()

  return <div>
    <h3>Download</h3>
    {meta.chr === undefined
      ? 'no chr'
      : <button onClick={() =>
          download_ua(meta.chr!, meta.name)
        }>CHR</button>
    }
  </div>
}

function FirstTile() {
  const meta = nes_file.useCTX()
  const scale = 16
  const canvas = useCanvas(scale)

  useEffect(() => {
    const c = canvas.current!
    const canvas_ctx = c.getContext('2d')!
    canvas_ctx.imageSmoothingEnabled = false
    canvas_ctx.clearRect(0, 0, c.width, c.height)

    if (meta.chr === undefined)
      return

    const tile = cook_tile(
      extract_raw_tile(meta.chr!, 0)
    )
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
  }, [meta.chr])

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

function download_ua(ua: Uint8Array, file_name: string) {
  const blob = new Blob([ua], { type: 'application/octet-stream' })
  const chr_url = URL.createObjectURL(blob)
  const chr_link = document.createElement('a')
  chr_link.href = chr_url
  chr_link.download = file_name + '.chr'
  chr_link.click()
}