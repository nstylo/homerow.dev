import { Link } from "gatsby"
import styled from "styled-components"
import React from "react"

interface ItemProps {
  name: string
  path: string // path to redirect on click
  className: string
}

const Item = ({ name, path, className }: ItemProps): JSX.Element => (
  <Container>
    <h3 className={className}>
      <StyledLink to={path}>{name}</StyledLink>
    </h3>
  </Container>
)

interface MainItemProps {
  name: string
  path?: string // path is optional, default is "/"
  className: string
}

const MainItem = ({ name, path = "/", className }: MainItemProps): JSX.Element => (
  <Container>
    <h2 className={className}>
      <StyledLink to={path}>{name}</StyledLink>
    </h2>
  </Container>
)

interface HeaderProps {
  siteTitle: string
  className: string
}

// const SocialBar = () => (
//
// )

const Header = ({ siteTitle, className }: HeaderProps): JSX.Element => (
  <header className={className}>
    <HeaderWrapper>
      <MainItem name={siteTitle} className={"mainitem"} />
      <StyledItem name="Home" path="/" className={"item"} />
      <StyledItem name="Home" path="/" className={"item"} />
      <StyledItem name="Home" path="/" className={"item"} />
    </HeaderWrapper>
  </header>
)

const StyledItem = styled(Item)``

const Container = styled.div`
  flex-grow: 1;
`

const HeaderWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1024px;
  padding: 0.5rem 1rem;
`

const StyledLink = styled(Link)`
  color: ${(props): string => props.theme.foreground};
  text-decoration: none;
`

const StyledHeader = styled(Header)`
  background-color: transparent;
`

export default StyledHeader
