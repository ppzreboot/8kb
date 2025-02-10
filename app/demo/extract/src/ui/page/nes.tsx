import { useMemo } from 'react'
import { get_size } from './common/file-meta'

export
function NES_page(props: {
  file: File
}) {
  return <div>
    <Meta file={props.file} />
  </div>
}

function Meta(props: { file: File }) {
  const f = props.file

  const meta = useMemo(() => {
    const size = get_size(f)
    return { size }
  }, [f])
  
  return <div>
    <h5>File Meta</h5>
    <ul>
      <li>
        <label>size</label>
        <span>{meta.size}</span>
      </li>
    </ul>
  </div>
}
