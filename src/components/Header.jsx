import { Link } from "gatsby"
import styled from "styled-components"
import React from "react"

import Searchbar from "./Searchbar"
import LinkedInIcon from "../images/linkedin.svg"
import RSSIcon from "../images/rss.svg"
import GitHubIcon from "../images/github.svg"

const Item = ({ name, path, className }) => (
  <h4 className={className}>
    <StyledLink to={path}>{name}</StyledLink>
  </h4>
)

const MainItem = ({ name, path = "/", className }) => (
  <h3 className={className}>
    <StyledLink to={path}>{name}</StyledLink>
  </h3>
)

const ImageLink = ({ path = "/", children, className }) => (
  <a href={path} className={className} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

const Header = ({ siteTitle, className }) => (
  <header className={className}>
    <HeaderWrapper>
      <Container>
        <MainItem name={siteTitle} />
      </Container>
      <Container>
        <Item name="Projects" path="/projects" />
      </Container>
      <Container>
        <Item name="Blog" path="/blog" />
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
    fill: ${props => props.theme.foreground};
  }
`

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
  color: ${props => props.theme.foreground};
  text-decoration: none;
`

const StyledHeader = styled(Header)`
  background-color: transparent;
`

export default StyledHeader
