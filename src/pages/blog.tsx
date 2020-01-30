import React from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"

interface BlogPostPreviewProps {
  key: string
  title: string
  description: string
  date: string
  slug: string
  className: string
}

const BlogPostPreview = ({ key, title, description, date, slug, className }: BlogPostPreviewProps): JSX.Element => {
  return (
    <div key={key} className={className}>
      <Link to={slug}>
        <h2>{title}</h2>
      </Link>
      <p>{date}</p>
      <p>{description}</p>
    </div>
  )
}

const StyledBlogPostPreview = styled(BlogPostPreview)`
  background-color: black;
  padding: 8px 16px;
  border-left-style: solid;
  border-width: 3px;
  border-color: ${({ theme }): string => theme.primary};
`

const Blog = ({ data }) => {
  return (
    <Layout>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <StyledBlogPostPreview
          key={node.id}
          title={node.frontmatter.title}
          description={node.frontmatter.description}
          date={node.frontmatter.date}
          slug={node.fields.slug}
          className={"blogpostpreview"}
        />
      ))}
    </Layout>
  )
}

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
