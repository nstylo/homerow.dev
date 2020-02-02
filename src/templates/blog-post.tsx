import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

import SubscriptionForm from "../forms/SubscriptionForm"
import Comments from "../components/Comments"

class BlogPost extends React.Component {
  render(): JSX.Element {
    const post = this.props.data.markdownRemark

    return (
      <Layout>
        <div>
          <h2>{post.frontmatter.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Comments className="comments" />
          <SubscriptionForm />
        </div>
      </Layout>
    )
  }
}

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
