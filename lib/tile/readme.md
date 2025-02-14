# @8kb/tile

+ extract the chr rom from a iNES rom
+ extract tiles from a chr rom
+ render a tile to a ImageData

``` bash
npm i @8kb/tile
```

> A library should provide the fewest possible functions
> to keep the code concise;
> however, its documentation should showcase broader capabilities.
>
> -- **Provide more capabilities with doc rather than code**.

## Glossary

### iNES

Consult a Chat AI if you aren't familiar with `iNES`:
> Introduce iNES the rom file format of Nintendo entertainment system.


### tile

NES games use tiny 8x8 pixel pictures called "tiles"
to build all the graphics you see,
like backgrounds and characters.
They're like the pixels of the NES, but bigger.

+ A tile has 8\*8 pixels
+ A pixel has 2 bits (for 4 colors)
+ A tile has 8\*8\*2 bits
+ A tile has 16 bytes

> [!IMPORTANT]
> `tile[0] + tile[1]` is not a pixel.  
> `tile[0] + tile[0 + 64]` is a pixel.  

## Showcase

##### Read a File

``` ts
function read_file(file: File): Promise<Uint8Array> {
  return file.arrayBuffer()
    .then(ab =>
      new Uint8Array(ab)
    )
}
```

##### extract chr from nes.
``` ts
import { validate_nes, extract_chr } from '@8kb/tile'

function extract_chr_from_nes(nes: Uint8Array): Uint8Array {
  if (!validate_nes(nes))
    throw Error('invalid rom')

  if (nes[5] === 0) // ...
    throw Error('no chr')

  return extract_chr(nes)
}
```

##### Download Uint8Array

``` ts
function download_ua(ua: Uint8Array, file_name: string) {
  const blob = new Blob([ua], { type: 'application/octet-stream' })
  const chr_url = URL.createObjectURL(blob)
  const chr_link = document.createElement('a')
  chr_link.href = chr_url
  chr_link.download = file_name + '.chr'
  chr_link.click()
}
```

##### Render A Tile (I_tile -> ImageData)

``` ts
import { render_tile } from '@8kb/tile'

function render(tile: I_tile) {
  const img_data = render_tile(tile, {
    0: [0, 0, 0, 0],     // transparent or any other color
    1: [255, 0, 0, 255], // red
    2: [0, 255, 0, 255], // green
    3: [0, 0, 255, 255], // bluek
  })
}
```

##### Render A Tile to Canvas
Please refer to [@8kb/render](https://github.com/ppzreboot/8kb/tree/main/lib/render).
