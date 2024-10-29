export
function scale_img_data(img: ImageData, ratio: number) {
  if (!Number.isInteger(ratio) || ratio <= 0)
    throw Error('ratio must be a positive integer')
  if (ratio === 1)
    return new ImageData(img.data.slice(), img.width, img.height)  

  const w = img.width
  const sw = img.width * ratio
  const h = img.height

  const new_data = Array
    .from({
      length: (w * 4 * ratio) * (h * ratio)
    })
    .map((_, i) => {
      // 新坐标
      const x = Math.floor(i / 4) % sw
      const y = Math.floor(i / (sw * 4))
      const z = i % 4
      // 老坐标
      const x_from = Math.floor(x / ratio)
      const y_from = Math.floor(y / ratio)
      // 用老坐标从老数据里取出
      return img.data[y_from * w * 4 + x_from * 4  + z]
    })

  return new ImageData(new Uint8ClampedArray(new_data), w * ratio, h * ratio)
}
