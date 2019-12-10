import { Link } from "gatsby"
import styled from "styled-components"
import React from "react"

import Searchbar from "./Searchbar"
import LinkedInSvg from "../images/linkedin.svg"
import RssSvg from "../images/rss.svg"
import GitHub from "../images/github.svg"

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
  imgSource: string
  alt: string
  className: string
}

const ImageLink = ({ path = "/", imgSource, alt, className }: ImageLinkProps): JSX.Element => (
  <Link to={path} className={className}>
    <img src={imgSource} alt={alt} />
  </Link>
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
        <StyledImageLink path="/test" imgSource={LinkedInSvg} alt="LinkedIn" className="imagelink" />
        <StyledImageLink path="/test" imgSource={GitHub} alt="GitHub" className="imagelink" />
        <StyledImageLink path="/test" imgSource={RssSvg} alt="RSS" className="imagelink" />
      </Container>
    </HeaderWrapper>
  </header>
)

const StyledImageLink = styled(ImageLink)`
  height: 100%;
  width: auto;
  img {
    height: 100%;
    width: 30px;
    margin: 0 10px;
    filter: invert(100%);
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
