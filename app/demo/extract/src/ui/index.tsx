import { useMemo } from 'react'
import { I_SDD_unit, SDD_unit } from 'react-sdd'
import { I_app_state, is_page_key } from '../sdd'
import { NES_page } from './page/nes'
import { CHR_page } from './page/chr'

export
function App(props: I_app_state) {
  const file = props.current.useState(s => s.file)

  return <>
    <Header file={SDD_unit(props.current, 'file')} />
    {file && <Page file={file} />}
  </>
}

function Header(props: {
  file: I_SDD_unit<File | null>
}) {
  return <div>
    <input
      type='file'
      onChange={evt =>
        props.file.set(() => {
          const file = evt.target.files?.[0]
          if (!file)
            return null
          return file
        })
      }
    />
  </div>
}

function Page({ file }: { file: File }) {
  const page_key = useMemo(() => {
    const suffix = file.name.split('.').at(-1)
    if (!suffix) return null
    if (!is_page_key(suffix)) return null
    return suffix
  }, [file])

  return page_key
    ? {
      nes: <NES_page file={file} />,
      chr: <CHR_page />,
    }[page_key]
    : <div>wrong type of file</div>
}
