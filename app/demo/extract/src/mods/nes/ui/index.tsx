import { download_chr } from '@8kb/extract'
import { app_file_meta } from '../../../ss/ctx'

export
function NES_page() {
  return <div>
    <Meta />
    <Download />
  </div>
}

function Meta() {
  const meta = app_file_meta.useCTX()

  return <div>
    <h5>File Meta</h5>
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
  const meta = app_file_meta.useCTX()

  return <button onClick={() => {
    download_chr(meta.ua, meta.name)
  }}>Download CHR</button>
}
