import React, { useState } from "react"
import styled from "styled-components"

interface SearchbarProps {
  className?: string
}

const Searchbar = ({ className }: SearchbarProps): JSX.Element => {
  const [value, setValue] = useState("")

  return <input type="text" value={value} onChange={(e): void => setValue(e.target.value)} className={className} />
}

const StyledSearchbar = styled(Searchbar)``

export default StyledSearchbar
