import React from "react"
import styled from "styled-components"
import NetlifyIcon from "../images/netlify.svg"
import StyledIcon from "../images/styled-components.svg"
import GatsbyIcon from "../images/gatsby.svg"
import TSIcon from "../images/typescript.svg"
import ReactIcon from "../images/reacticon.svg"
import IssoIcon from "../images/isso.svg"

const Footer = () => {
  return (
    <Wrapper>
      <p>© {new Date().getFullYear()} Homerow - Software Blog</p>
      <p>built with</p>
      <div>
        <StyledImageLink path="https://www.gatsbyjs.org/">
          <GatsbyIcon />
        </StyledImageLink>
        <StyledImageLink path="https://www.reactjs.org/">
          <ReactIcon />
        </StyledImageLink>
        <StyledImageLink path="https://www.typescriptlang.org/">
          <TSIcon />
        </StyledImageLink>
        <StyledImageLink path="https://styled-components.com/">
          <StyledIcon />
        </StyledImageLink>
        <StyledImageLink path="https://www.netlify.com/">
          <NetlifyIcon />
        </StyledImageLink>
        <StyledImageLink path="https://posativ.org/isso/">
          <IssoIcon />
        </StyledImageLink>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid ${props => props.theme.backgroundSecondary} !important;
`

const ImageLink = ({ path = "/", className, children }) => (
  <a href={path} className={className} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
)

const StyledImageLink = styled(ImageLink)`
  height: 100%;
  width: 100%;
  svg {
    height: 26px;
    width: 26px;
    margin: 0 10px;
    fill: ${props => props.theme.foreground};
  }
`

export default Footer
