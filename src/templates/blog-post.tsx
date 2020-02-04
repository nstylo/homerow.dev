import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import SubscriptionForm from "../forms/SubscriptionForm"
import Comments from "../components/Comments"

class BlogPost extends React.Component<{ className?: string }> {
  render(): JSX.Element {
    const post = this.props.data.markdownRemark

    return (
      <Layout>
        <StyledArticle post={post} className="blog" />
        <Comments className="comments" />
        <SubscriptionForm />
      </Layout>
    )
  }
}

const Article = ({ className, post }) => {
  return (
    <div className={className}>
      <h2>{post.frontmatter.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
  )
}

const StyledArticle = styled(Article)`
  a {
    color: ${(props): string => props.theme.primary};
    text-decoration: none;
  }
`

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default BlogPost
