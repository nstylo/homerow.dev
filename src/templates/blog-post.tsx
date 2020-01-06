import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"

class BlogPost extends React.Component {
  componentDidMount(): void {
    const scriptElem = document.createElement("script")
    scriptElem.type = "text/javascript"
    scriptElem.setAttribute("data-isso", "https://comments.homerow.dev/")
    scriptElem.setAttribute("data-isso-css", "true")
    scriptElem.setAttribute("src", "https://comments.homerow.dev/js/embed.min.js")
    scriptElem.async = true

    const sectionElem = document.createElement("section")
    sectionElem.id = "isso-thread"
    this.instance.appendChild(scriptElem)
    this.instance.appendChild(sectionElem)
  }

  render(): JSX.Element {
    const post = this.props.data.markdownRemark

    return (
      <Layout>
        <div>
          <h2>{post.frontmatter.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <div ref={el => (this.instance = el)}></div>
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
