import type { tile, color_8kb } from './common'

export
function scale_tile(tile: tile, ratio: number): color_8kb[][] {
  return tile
    .map(
      row => {
        const rows: color_8kb[][] = []
        for (let i=0; i<ratio; i++)
          rows.push(row.slice())
        return rows
      }
    )
    .flat()
    .map(
      row =>
        row.map(color => {
          const colors: color_8kb[] = []
          for (let i=0; i<ratio; i++)
            colors.push(color)
          return colors
        })
        .flat()
    )
}