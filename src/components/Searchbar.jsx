import React, { useState } from "react"
import styled from "styled-components"

const Searchbar = ({ className }) => {
  const [value, setValue] = useState("")

  return <input type="text" value={value} onChange={e => setValue(e.target.value)} className={className} />
}

const StyledSearchbar = styled(Searchbar)``

export default StyledSearchbar
