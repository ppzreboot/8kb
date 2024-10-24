import { parse_8kb } from '@8kb/parse'
import { render_tile, type color_map } from '@8kb/render'

const canvas = document.querySelector('canvas')!
const canvas_ctx = canvas.getContext('2d')!
const file_input = document.getElementById('file-input')!

const color_map: color_map = {
  0: [0,0,0,0],
  1: [237,159,35,255],
  2: [182,48,32,255],
  3: [107,109,0,255],
}

file_input.onchange = async function(evt) {
  // @ts-ignore
  const file: File | undefined = evt.target.files[0]
  if (!file) return

  const tiles = parse_8kb(await file.arrayBuffer())

  render_tile({
    dx: 0,
    dy: 0,
    color_map,
    ctx: canvas_ctx,
    tile: tiles[0],
  })
  render_tile({
    dx: 8,
    dy: 0,
    color_map,
    ctx: canvas_ctx,
    tile: tiles[1],
  })
  render_tile({
    dx: 0,
    dy: 8,
    color_map,
    ctx: canvas_ctx,
    tile: tiles[2],
  })
  render_tile({
    dx: 8,
    dy: 8,
    color_map,
    ctx: canvas_ctx,
    tile: tiles[3],
  })
  render_tile({
    dx: 0,
    dy: 16,
    color_map,
    ctx: canvas_ctx,
    tile: tiles[4],
  })
  render_tile({
    dx: 8,
    dy: 16,
    color_map,
    ctx: canvas_ctx,
    tile: tiles[5],
  })
  render_tile({
    dx: 0,
    dy: 24,
    color_map,
    ctx: canvas_ctx,
    tile: tiles[6],
  })
  render_tile({
    dx: 8,
    dy: 24,
    color_map,
    ctx: canvas_ctx,
    tile: tiles[7],
  })
}
