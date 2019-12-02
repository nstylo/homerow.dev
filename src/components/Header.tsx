import { Link } from "gatsby"
import styled from "styled-components"
import React from "react"

import { H1 } from "./Basics"

interface HeaderProps {
  siteTitle: string
  className: string
}

const Header = ({ siteTitle = `No Title Given`, className }: HeaderProps): JSX.Element => (
  <header className={className}>
    <HeaderWrapper>
      <H1>
        <HeaderLink to="/">{siteTitle}</HeaderLink>
      </H1>
    </HeaderWrapper>
  </header>
)

const HeaderLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const HeaderWrapper = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 1.45rem 1.0875rem;
`

const StyledHeader = styled(Header)`
  background-color: transparent;
`

export default StyledHeader
