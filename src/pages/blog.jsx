import React, { useState, createContext, useContext, useEffect } from "react"
import useDebounce from "../misc/useDebounce"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import { Index } from "elasticlunr"

import Layout from "../components/Layout"
import Clock from "../images/clock.svg"

// global context for blogpost search
const QueryContext = createContext({})

export default ({ data }) => {
  const [searchResult, setSearchResult] = useState(new Set())
  const [isSearching, setSearching] = useState(false)
  const [index] = useState(Index.load(data.siteSearchIndex?.index))

  return (
    <Layout>
      <QueryContext.Provider
        value={{
          searchResult,
          setSearchResult,
          isSearching,
          setSearching,
          index,
        }}
      >
        <Options />
        <Preview allMarkdownEdges={data.allMarkdownRemark.edges} />
      </QueryContext.Provider>
    </Layout>
  )
}

const Preview = ({ allMarkdownEdges }) => {
  const queryContext = useContext(QueryContext)
  const allBlogPosts = allMarkdownEdges.filter(({ node }) =>
    queryContext.isSearching ? queryContext.searchResult.has(node.id) : true
  )

  return (
    <PreviewWrapper flexdir="column">
      {allBlogPosts.map(({ node }) => (
        <ListPreview
          key={node.id}
          title={node.frontmatter?.title ? node.frontmatter.title : undefined}
          description={node.frontmatter?.description ? node.frontmatter.description : undefined}
          date={node.frontmatter?.date ? node.frontmatter.date : undefined}
          slug={node.fields?.slug}
          featuredImage={
            node.frontmatter?.featuredImage ? node.frontmatter?.featuredImage?.childImageSharp?.fluid : null
          }
          tags={node.frontmatter?.tags ? node.frontmatter.tags : undefined}
        />
      ))}
    </PreviewWrapper>
  )
}

const UOptions = ({ className }) => (
  <section className={className}>
    <Searchbar />
  </section>
)

const Options = styled(UOptions)`
  display: flex;
  width: 100%;
  height: 56px;
  margin-bottom: 32px;
  background-color: ${props => "#181818"};
`

const USearchbar = ({ className }) => {
  const [value, setValue] = useState("") // controlled value
  const queryContext = useContext(QueryContext)

  // debounce input value
  const debouncedQuery = useDebounce(value, 250)

  // update queryContext if debouncedQuery has changed its value, i.e. start searching
  // if some amount of time has passed
  useEffect(() => {
    if (debouncedQuery) {
      const index = queryContext.index

      // search the index
      const queryResult = index.search(debouncedQuery, {}).map(({ ref }) => index.documentStore.getDoc(ref).id)

      // update the queryContext so preview can rerender
      queryContext.setSearching(true)
      queryContext.setSearchResult(new Set(queryResult)) // transform queryResult into set
    } else {
      queryContext.setSearching(false) // don't search if input field is empty
    }
  }, [debouncedQuery])

  return (
    <div className={className}>
      <input
        type="search"
        value={value}
        name="search"
        placeholder="Search blogposts ..."
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={() => setValue("")}>Reset</button>
    </div>
  )
}

const Searchbar = styled(USearchbar)`
  margin-left: auto;
  input {
    padding-left: 12px;
    height: 80%;
    width: 300px;
  }
  button {
    height: 80%;
  }
`

const PreviewWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`

const ListPreview = ({
  title = "NO TITLE GIVEN",
  description = "NO DESCRIPTION GIVEN",
  date = "NO DATE GIVEN",
  slug = "NO SLUG GIVEN",
  className,
  featuredImage,
  tags = [],
}) => (
  <ListWrapper to={slug} className={className}>
    {featuredImage ? <Img fluid={featuredImage} /> : null}
    <ListSection title={title} description={description} date={date} tags={tags} />
  </ListWrapper>
)

const ListWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 36% 60%;
  width: 100%;
  height: 250px;
  background-color: ${props => "#181818"};
  margin-bottom: 32px;
  text-decoration: none;
  border-style: solid;
  border-width: 1px 0;
  border-color: #343434;

  .gatsby-image-wrapper {
    grid-column-start: 1;
    grid-column-end: 1;
    margin: 8px;
  }
`

const UListSection = ({ title, description, date, className, tags }) => {
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
      <TagLine tags={tags} />
    </div>
  )
}

const ListSection = styled(UListSection)`
  color: ${props => props.theme.foreground};
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

const UTagLine = ({ tags, className }) => (
  <div className={className}>
    {tags.map(tag => (
      <Tag key={tag} tag={tag} />
    ))}
  </div>
)

const TagLine = styled(UTagLine)`
  width: 100%;
  height: auto;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const UTag = ({ tag, className }) => <span className={className}>{tag}</span>

const Tag = styled(UTag)`
  padding: 4px 8px;
  margin-right: 12px;
  margin-bottom: 12px;
  background-color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.primary};
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.55rem;
`

export const query = graphql`
  query Blog {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            featuredImage {
              childImageSharp {
                fluid(maxWidth: 512, maxHeight: 512) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            tags
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    siteSearchIndex {
      index
    }
  }
`
