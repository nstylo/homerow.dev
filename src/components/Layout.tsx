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
  success: string
  error: string
}

const theme: ThemeProps = {
  foreground: "#fff",
  background: "#000",
  backgroundSecondary: "#343434",
  primary: "#ee6352",
  secondary: "#006989",
  success: "#00b9ae",
  error: "#ff5e5b",
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
  p, label, button, input {
    margin: 0;
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
            <Footer>
              <Container colStart={1} colEnd={1}>
                <p>Built with ....</p>
              </Container>
              <Container colStart={1} colEnd={3} rowStart={2} rowEnd={2}>
                <p>
                  © {new Date().getFullYear()}, Built with
                  {` `}
                  <a href="https://www.gatsbyjs.org">Gatsby</a>
                </p>
              </Container>
            </Footer>
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

const Footer = styled.footer`
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: ;
  max-width: 1024px;
  margin: 0 auto;
`

export default Layout
