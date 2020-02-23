import React, { useState, createContext, useContext } from "react"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import Img, { FluidObject } from "gatsby-image"
import { Index } from "elasticlunr"

import Layout from "../components/Layout"
import Clock from "../images/clock.svg"

import {
  BlogQuery,
  MarkdownRemark,
  Maybe,
  MarkdownRemarkFields,
  GatsbyImageSharpFluidFragment,
  MarkdownRemarkFrontmatter,
} from "../../types/graphql-types"

interface IQueryContext {
  searchResult: Set<string>
  setSearchResult: React.Dispatch<React.SetStateAction<Set<string>>> | null
  isSearching: boolean
  setSearching: React.Dispatch<React.SetStateAction<boolean>> | null
}

const QueryContext = createContext<IQueryContext>({
  searchResult: new Set<string>(),
  setSearchResult: null,
  isSearching: false,
  setSearching: null,
})

interface IBlog {
  data: BlogQuery
}

export default ({ data }: IBlog): JSX.Element => {
  const [searchResult, setSearchResult] = useState<Set<string>>(new Set<string>())
  const [isSearching, setSearching] = useState<boolean>(false)

  return (
    <Layout>
      <QueryContext.Provider value={{ searchResult, setSearchResult, isSearching, setSearching }}>
        <Options searchIndex={data.siteSearchIndex?.index} />
        <Preview allMarkdownEdges={data.allMarkdownRemark.edges} />
      </QueryContext.Provider>
    </Layout>
  )
}

interface IPreview {
  allMarkdownEdges: Array<{
    node: Pick<MarkdownRemark, "id" | "excerpt"> & {
      frontmatter: Maybe<
        Pick<MarkdownRemarkFrontmatter, "title" | "date" | "description" | "tags"> & {
          featuredImage: Maybe<{ childImageSharp: Maybe<{ fluid: Maybe<GatsbyImageSharpFluidFragment> }> }>
        }
      >
      fields: Maybe<Pick<MarkdownRemarkFields, "slug">>
    }
  }>
}

const Preview = ({ allMarkdownEdges }: IPreview): JSX.Element => {
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
          slug={node.fields?.slug as string}
          featuredImage={
            node.frontmatter?.featuredImage
              ? (node.frontmatter?.featuredImage?.childImageSharp?.fluid as FluidObject)
              : null
          }
          tags={node.frontmatter?.tags ? node.frontmatter.tags : undefined}
        />
      ))}
    </PreviewWrapper>
  )
}

interface IOptions {
  searchIndex: any
  className?: string
}

const UnstyledOptions = ({ className, searchIndex }: IOptions): JSX.Element => (
  <section className={className}>
    <Searchbar searchIndex={searchIndex} />
  </section>
)

const Options = styled(UnstyledOptions)`
  display: flex;
  width: 100%;
  height: 56px;
  margin-bottom: 32px;
  background-color: ${(props): string => "#181818"};
`

const Searchbar = ({ searchIndex }): JSX.Element => {
  const [value, setValue] = useState("") // controlled value
  const queryContext = useContext(QueryContext)
  let index: Index

  const getOrCreateIndex = () =>
    index
      ? index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(searchIndex)

  const search = e => {
    const query = e.target.value
    setValue(query)

    //query field empty, so we don't search
    if (query === "") {
      queryContext.setSearching(false)
      return
    }

    index = getOrCreateIndex()
    const queryResult = index.search(query, {}).map(({ ref }) => index.documentStore.getDoc(ref).id) // search index

    queryContext.setSearchResult(new Set(queryResult)) // transform queryResult into set
    queryContext.setSearching(true) // we have searched
  }

  return <input type="search" value={value} name="search" onChange={search} />
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
  title?: string
  description?: string
  date?: string
  slug?: string
  className?: string
  featuredImage: FluidObject | null
  tags?: Maybe<string>[]
}

const ListPreview = ({
  title = "NO TITLE GIVEN",
  description = "NO DESCRIPTION GIVEN",
  date = "NO DATE GIVEN",
  slug = "NO SLUG GIVEN",
  className,
  featuredImage,
  tags = [],
}: ListPreviewProps): JSX.Element => (
  <ListWrapper to={slug} className={className}>
    {featuredImage ? <Img fluid={featuredImage} /> : null}
    <ListSection title={title} description={description} date={date} tags={tags} />
  </ListWrapper>
)

const ListWrapper = styled(Link)`
  display: grid;
  grid-template-columns: 36% 60%;
  width: 100%;
  min-height: 300px;
  background-color: ${(props): string => "#181818"};
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

interface ListSectionProps {
  title: string
  description: string
  date: string
  className?: string
  tags: string[]
}

const UnstyledListSection = ({ title, description, date, className, tags }: ListSectionProps): JSX.Element => {
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

const ListSection = styled(UnstyledListSection)`
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

interface TagLineProps {
  tags: string[]
  className?: string
}

const UnstyledTagLine = ({ tags, className }: TagLineProps): JSX.Element => (
  <div className={className}>
    {tags.map(
      (tag): JSX.Element => (
        <Tag key={tag} tag={tag} />
      )
    )}
  </div>
)

const TagLine = styled(UnstyledTagLine)`
  width: 100%;
  height: auto;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

interface TagProps {
  tag: string
  className?: string
}

const UnstyledTag = ({ tag, className }: TagProps): JSX.Element => <span className={className}>{tag}</span>

const Tag = styled(UnstyledTag)`
  padding: 4px 8px;
  margin-right: 12px;
  margin-bottom: 12px;
  background-color: ${(props): string => props.theme.primary};
  border: 1px solid ${(props): string => props.theme.primary};
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
