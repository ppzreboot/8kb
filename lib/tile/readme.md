# @8kb/extract

``` bash
npm i @8kb/extract
```

This lib has 2 main funtions:
+ extract chr from a nes file
+ extract tiles from a chr

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
