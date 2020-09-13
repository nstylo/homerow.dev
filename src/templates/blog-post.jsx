import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/Layout"
import SubscriptionForm from "../forms/SubscriptionForm"
import Comments from "../components/Comments"

import LeftArrow from "../images/left-arrow.svg"
import RightArrow from "../images/right-arrow.svg"

class BlogPost extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext

    return (
      <Layout>
        <StyledArticle post={post} />
        <Pagination previous={previous} next={next} />
        <Comments />
        <SubscriptionForm />
      </Layout>
    )
  }
}

const Article = ({ className, post, pageContext }) => (
  <div className={className}>
    <h2>{post.frontmatter.title}</h2>
    <div dangerouslySetInnerHTML={{ __html: post.html }} />
  </div>
)

const StyledArticle = styled(Article)`
  a {
    color: ${props => props.theme.primary};
    text-decoration: none;
  }
`

const Pagination = ({ previous, next }) => {
  return (
    <Wrapper>
      {previous ? (
        <LeftSpan>
          <Link to={previous.fields.slug}>
            <LeftArrow /> <p>{previous.frontmatter.title}</p>
          </Link>
        </LeftSpan>
      ) : null}
      {next ? (
        <RightSpan>
          <Link to={next.fields.slug}>
            <p>{next.frontmatter.title}</p> <RightArrow />
          </Link>
        </RightSpan>
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  width: 100%;
  height: 52px;
  padding: 84px 0 0 0;
  display: flex;
  align-items: center;

  svg {
    fill: ${props => props.theme.primary};
    width: 26px;
    height: 26px;
  }

  a {
    display: inline-flex;
    font-size: 0.8rem;
    font-weight: bold;
    text-decoration: none;
    color: ${props => props.theme.foreground};
  }
`

const LeftSpan = styled.span`
  display: inline-flex;

  svg {
    margin-right: 18px;
  }

  p {
    position: relative;
    margin: 0;
    font-size: 0.8rem;
  }
  p::before {
    position: absolute;
    bottom: 52px;
    content: "previous";
    color: ${props => props.theme.backgroundSecondary};
    font-size: 0.6rem;
    font-weight: normal;
  }
`

const RightSpan = styled.span`
  display: inline-flex;
  margin-left: auto;

  svg {
    margin-left: 18px;
  }

  p {
    position: relative;
    margin: 0;
    font-size: 0.8rem;
  }
  p::before {
    position: absolute;
    bottom: 52px;
    right: 0;
    content: "next";
    color: ${props => props.theme.backgroundSecondary};
    font-size: 0.6rem;
    font-weight: normal;
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
