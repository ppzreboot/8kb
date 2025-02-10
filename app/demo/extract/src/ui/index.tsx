import { useEffect, useState } from 'react'
import { I_file_meta } from '../ss/types'
import { app_file_meta } from '../ss/ctx'
import { NES_page } from '../mods/page/nes'
import { CHR_page } from '../mods/page/chr'

export
function App() {
  const [file, set_file] = useState<File>()
  const [meta, set_meta] = useState<null | I_file_meta>(null)
  useEffect(() => {
    if (file)
      file.arrayBuffer().then(ab => {
        set_meta({
          size: file.size,
          name: file.name,
          suffix: file.name.split('.').at(-1)!,
          ua: new Uint8Array(ab),
        })
      })
    else
      set_meta(null)
  }, [file])

  return <>
    <Header file={file} set_file={set_file} />
    {meta &&
      <app_file_meta.Provider value={meta}>
        <Page />
      </app_file_meta.Provider>
    }
  </>
}

function Header(props: {
  file?: File
  set_file: (f?: File) => void
}) {
  return <div>
    <input
      type='file'
      onChange={evt =>
        props.set_file(evt.target.files?.[0])
      }
    />
  </div>
}

function Page() {
  const meta = app_file_meta.useCTX()
  return {
    nes: <NES_page />,
    chr: <CHR_page />,
  }[meta.suffix]
  || <div>wrong type of file</div>
}
