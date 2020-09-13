import React from "react"
import styled from "styled-components"

class Comments extends React.Component {
  componentDidMount() {
    const scriptElem = document.createElement("script")
    scriptElem.type = "text/javascript"
    scriptElem.setAttribute("data-isso", "https://comments.homerow.dev/")
    scriptElem.setAttribute("data-isso-css", "true")
    scriptElem.setAttribute("data-isso-avatar", "true")
    scriptElem.setAttribute("data-isso-vote", "true")
    scriptElem.setAttribute("data-isso-max-comments-top", "5")
    scriptElem.setAttribute("data-isso-max-comments-nested", "3")
    scriptElem.setAttribute("src", "https://comments.homerow.dev/js/embed.min.js")
    scriptElem.async = true

    const sectionElem = document.createElement("section")
    sectionElem.id = "isso-thread"
    this.instance.appendChild(scriptElem)
    this.instance.appendChild(sectionElem)
  }

  render() {
    return <div className={this.props.className} ref={el => (this.instance = el)} />
  }
}

const StyledComments = styled(Comments)`
  font-size: 24px;
  p,
  li {
    font-size: 20px;
  }
  h4 {
    padding-top: 16px;
    border-top: 1px solid ${props => props.theme.backgroundSecondary} !important;
  }

  #isso-root {
    margin: 0 0 40px 0;
  }
  .isso-postbox {
    margin: 0 !important;
  }
  .textarea {
    font-size: 20px;
    border-radius: 0 !important;
    background-color: ${props => props.theme.backgroundSecondary} !important;
    margin: 0.4rem 0 0.3rem 0 !important;
  }
  input {
    border-radius: 0 !important;
    color: ${props => props.theme.foreground} !important;
    background-color: ${props => props.theme.backgroundSecondary} !important;
  }
  .post-action {
    margin: 0 0 0 7px !important;
  }
  .input-wrapper input {
  }
  .post-action input {
    color: white;
    background-color: ${props => props.theme.primary} !important;
    border: none !important;
    line-height: 40px !important;
    padding: 0 0.4rem !important;
  }
  .preview {
    margin: 0.4rem 0 0.3rem 0 !important;
    color: ${props => props.theme.background} !important;
    border: none !important;
    border-radius: 0 !important;
    min-height: 58px;
  }
  .text ul {
    padding-inline-start: 100px !important;
  }
  .isso-comment {
    border-top: 1px solid ${props => props.theme.backgroundSecondary} !important;
  }
  .preview .isso-comment {
    border-top: none !important;
  }
  .author {
  }
  .reply,
  .edit,
  .delete,
  .load_hidden {
    color: ${props => props.theme.primary} !important;
  }
  a:hover {
  }
  .isso-feedlink:hover,
  .isso-comment div.text-wrapper .isso-comment-footer a:hover {
    color: ${props => props.theme.foreground} !important;
    text-shadow: none !important;
  }
  .avatar svg {
    border: 2px solid ${props => props.theme.primary} !important;
  }
`

export default StyledComments
