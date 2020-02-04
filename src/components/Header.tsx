import { Link } from "gatsby"
import styled from "styled-components"
import React from "react"

import Searchbar from "./Searchbar"
import LinkedInIcon from "../images/linkedin.svg"
import RSSIcon from "../images/rss.svg"
import GitHubIcon from "../images/github.svg"

interface ItemProps {
  name: string
  path: string // path to redirect on click
  className: string
}

const Item = ({ name, path, className }: ItemProps): JSX.Element => (
  <h4 className={className}>
    <StyledLink to={path}>{name}</StyledLink>
  </h4>
)

interface MainItemProps {
  name: string
  path?: string // path is optional, default is "/"
  className: string
}

const MainItem = ({ name, path = "/", className }: MainItemProps): JSX.Element => (
  <h3 className={className}>
    <StyledLink to={path}>{name}</StyledLink>
  </h3>
)

interface ImageLinkProps {
  path?: string
  className: string
  children: React.ReactNode
}

const ImageLink = ({ path = "/", children, className }: ImageLinkProps): JSX.Element => (
  <a href={path} className={className} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

interface HeaderProps {
  siteTitle: string
  className: string
}

const Header = ({ siteTitle, className }: HeaderProps): JSX.Element => (
  <header className={className}>
    <HeaderWrapper>
      <Container>
        <MainItem name={siteTitle} className={"mainitem"} />
      </Container>
      <Container>
        <StyledItem name="Projects" path="/projects" className={"item"} />
      </Container>
      <Container>
        <StyledItem name="Blog" path="/blog" className={"item"} />
      </Container>
      <Container>
        <Searchbar className="searchbar" />
      </Container>
      <Container>
        <StyledImageLink path="https://www.linkedin.com/in/niklas-stylianou-452367199">
          <LinkedInIcon />
        </StyledImageLink>
        <StyledImageLink path="https://github.com/nstylo">
          <GitHubIcon />
        </StyledImageLink>
        <StyledImageLink path="/rss.xml">
          <RSSIcon />
        </StyledImageLink>
      </Container>
    </HeaderWrapper>
  </header>
)

const StyledImageLink = styled(ImageLink)`
  height: 100%;
  width: auto;
  svg {
    height: 100%;
    width: 30px;
    margin: 0 10px;
    fill: ${(props): string => props.theme.foreground};
  }
`

const StyledItem = styled(Item)``

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`

const HeaderWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  height: 60px;
  justify-content: space-between;
`

const StyledLink = styled(Link)`
  color: ${(props): string => props.theme.foreground};
  text-decoration: none;
`

const StyledHeader = styled(Header)`
  background-color: transparent;
`

export default StyledHeader
