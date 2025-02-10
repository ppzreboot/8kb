import { validate_nes, extract_chr } from './mod'

export
function extract_chr_from_nes(ua: Uint8Array): [true, Blob]
| [false, 'invalid rom'] {
  const invalid = validate_nes(ua)
  if (invalid)
    return [false, 'invalid rom']

  const chr = extract_chr(ua)
  return [
    true,
    new Blob([chr], { type: 'application/octet-stream' }),
  ]
}

export
function download_chr(ua: Uint8Array, name: string): [true]
| [false, 'invalid rom'] {
  const [ok, result] = extract_chr_from_nes(ua)
  if (!ok)
    return [false, 'invalid rom']

  const chr_url = URL.createObjectURL(result)
  const chr_link = document.createElement('a')
  chr_link.href = chr_url
  chr_link.download = name + '.chr'
  chr_link.click()
  return [true]
}
