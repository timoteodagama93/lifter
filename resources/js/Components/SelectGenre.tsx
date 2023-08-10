import React from 'react'
import { generos } from '../../data/dummy'

function SelectGenre({className}) {
  return (
    <select
    onChange={() => {}}
    value=""
    className={className + ` p-1 text-sm rounded-lg outline-none sm:mt-0 mt-0`}
  >
    {generos.map(genero => (
      <option key={genero.value} value={genero.value}>
        {genero.title}
      </option>
    ))}
  </select>
  )
}

export default SelectGenre