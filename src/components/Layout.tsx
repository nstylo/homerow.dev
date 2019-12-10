/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"

import Header from "./Header"

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
  html {
    color: ${(props): string => props.theme.foreground}
    background-color: ${(props): string => props.theme.background};
    font-size: 32px;
    height: 100%;
  }
  body, #___gatsby, #gatsby-focus-wrapper {
    margin: 0;
    height: 100%;
  }
  h1 {
    margin: 0;
    font-size: 1rem;
  }
  h2 {
    margin: 0;
    font-size: 0.85rem;
  }
  h3 {
    margin: 0;
    font-size: 0.75rem;
  }
  h4 {
    margin: 0;
    font-size: 0.65rem;
  }
  p {
    margin: 0;
    font-size: 0.6rem;
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
        <Grid>
          <GridItem>
            <Header siteTitle={data.site.siteMetadata.title} className={"header"} />
          </GridItem>
          <GridItem>
            <Main>{children}</Main>
          </GridItem>
          <GridItem>
            <Footer>
              <p>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a href="https://www.gatsbyjs.org">Gatsby</a>
              </p>
            </Footer>
          </GridItem>
        </Grid>
      </ThemeProvider>
    </>
  )
}

const GridItem = styled.div`
  grid-column-start: 2;
  grid-column-end: 2;
`

const Grid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: auto 1024px auto;
  grid-template-rows: 80px auto 80px;
`

const Main = styled.main`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`

const Footer = styled.footer`
  width: 1024px;
  margin: 0 auto;
`

export default Layout
