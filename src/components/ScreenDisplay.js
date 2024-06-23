export default function Display ({ display }) {
  return (
    <div
      className='border rounded px-1 fs-3 text-end bg-light overflow-hidden'
      style={{ width: '100%' }}
    >
      <span id='display'>{display}</span>
    </div>
  )
}
