/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider, createGlobalStyle } from "styled-components"

import Header from "./Header"
import Button from "./Button"
// import "./layout.css"

interface ThemeProps {
  foreground: string
  background: string
  backgroundSecondary: string
  primary: string
  secondary: string
}

const theme: ThemeProps = {
  foreground: "#fff",
  background: "#000",
  backgroundSecondary: "#343434",
  primary: "#ee6352",
  secondary: "#006989",
}

const GlobalStyle = createGlobalStyle<{ theme: ThemeProps }>`
  body {
    background-color: ${(props): string => props.theme.background};
  }
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header siteTitle={data.site.siteMetadata.title} />
        <Button>Something</Button>
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </ThemeProvider>
    </>
  )
}

export default Layout
