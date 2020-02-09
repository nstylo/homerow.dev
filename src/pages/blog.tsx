import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/Layout"
import Clock from "../images/clock.svg"

const Blog = ({ data }) => {
  return (
    <Layout>
      <PreviewWrapper flexdir="column">
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <ListPreview
            key={node.id}
            title={node.frontmatter.title}
            description={node.frontmatter.description}
            date={node.frontmatter.date}
            slug={node.fields.slug}
            featuredImage={node.frontmatter.featuredImage ? node.frontmatter.featuredImage.childImageSharp.fluid : null}
          />
        ))}
      </PreviewWrapper>
    </Layout>
  )
}

type flexdir = "row" | "column"

interface PreviewWrapperProps {
  flexdir: flexdir
}

const PreviewWrapper = styled.div<PreviewWrapperProps>`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: ${(props): flexdir => props.flexdir};
`

interface ListPreviewProps {
  title: string
  description: string
  date: string
  slug: string
  className: string
  featuredImage: object
}

const ListPreview = ({ title, description, date, slug, className, featuredImage }: ListPreviewProps): JSX.Element => (
  <ListWrapper to={slug} className={className}>
    {featuredImage ? <Img fluid={featuredImage} /> : null}
    <ListSection title={title} description={description} date={date} />
  </ListWrapper>
)

const ListWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  height: 300px;
  background-color: ${(props): string => "#181818"};
  margin-bottom: 32px;
  text-decoration: none;
  border-style: solid;
  border-width: 1px 0;
  border-color: #343434;

  .gatsby-image-wrapper {
    grid-column-start: 1;
    grid-column-end: 1;
    max-width: 100%;
    max-height: 100%;
    margin: 8px;
  }
`

interface ListSectionProps {
  title: string
  description: string
  date: string
  className: string
}

const UnstyledListSection = ({ title, description, date, className }: ListSectionProps): JSX.Element => {
  return (
    <div className={className}>
      <h2>{title}</h2>
      <p>
        <span>
          <Clock />{" "}
        </span>
        Posted on {date}
      </p>
      <p>{description}</p>
    </div>
  )
}

const ListSection = styled(UnstyledListSection)`
  max-width: 100%;
  max-height: 100%;
  color: ${(props): string => props.theme.foreground};
  margin: 8px;

  svg {
    height: 14px;
    width: 14px;
    fill: #434343;
  }

  h2 + p {
    font-size: 0.55rem;
    color: #434343;
    margin: 0;
  }

  h2 {
    margin: 10px 0;
  }
`

const CardPreview = () => {}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 1024, maxHeight: 1024) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`

export default Blog
