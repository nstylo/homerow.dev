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
import Footer from "./Footer"

interface ThemeProps {
  foreground: string
  background: string
  backgroundSecondary: string
  primary: string
  secondary: string
  success: string
  error: string
}

const theme: ThemeProps = {
  foreground: "#fff",
  background: "#111",
  backgroundSecondary: "#343434",
  primary: "#ee6352",
  secondary: "#006989",
  success: "#00b9ae",
  error: "#ff5e5b",
}

const GlobalStyle = createGlobalStyle<{ theme: ThemeProps }>`
  @font-face {
      font-family: 'Open Sans';
      src: url('OpenSans-Regular.woff2') format('woff2'),
          url('OpenSans-Regular.woff') format('woff');
      font-weight: normal;
      font-style: normal;
  }
  html {
    color: ${(props): string => props.theme.foreground}
    background-color: ${(props): string => props.theme.background};
    font-size: 32px;
    font-family: 'Open Sans', sans-serif;
    height: 100%;
  }
  body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }
  h1 {
    font-size: 1rem;
  }
  h2 {
    font-size: 0.85rem;
  }
  h3 {
    font-size: 0.75rem;
  }
  h4 {
    font-size: 0.65rem;
  }
  p, label, button, input, li, a, th, td {
    font-size: 0.6rem;
  }
  .gatsby-highlight {
    font-size: 0.6rem;

    .line-numbers-rows {
      width: 2em !important;
      padding: 1em 0 1em 0.6em;
    }
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
          <Container colStart={2} colEnd={2}>
            <Header siteTitle={data.site.siteMetadata.title} className={"header"} />
          </Container>
          <Container colStart={2} colEnd={2}>
            <Main>{children}</Main>
          </Container>
          <Container colStart={2} colEnd={2}>
            <Footer />
          </Container>
        </Grid>
      </ThemeProvider>
    </>
  )
}

const Container = styled.div<{ colStart: number; colEnd: number; rowStart?: number; rowEnd?: number; style?: object }>`
  grid-column-start: ${({ colStart }): number => colStart};
  grid-column-end: ${({ colEnd }): number => colEnd};
  grid-row-start: ${({ rowStart }): number | undefined | null => rowStart};
  grid-row-end: ${({ rowEnd }): number | undefined | null => rowEnd};
`

const Grid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: auto 1024px auto;
  grid-template-rows: 80px auto 160px 80px;
`

const Main = styled.main`
  width: 100%;
  height: 100%;
  margin: 0 auto;
`

export default Layout
