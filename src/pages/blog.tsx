import React, { useState, createContext, useContext, useEffect } from "react"
import useDebounce from "./useDebounce"
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
  Scalars,
} from "../../types/graphql-types"

interface IQueryContext {
  searchResult: Set<string>
  readonly setSearchResult: React.Dispatch<React.SetStateAction<Set<string>>>
  isSearching: boolean
  readonly setSearching: React.Dispatch<React.SetStateAction<boolean>>
  readonly index: Index<any> // TODO
}

// global context for blogpost search
const QueryContext = createContext<IQueryContext>({} as IQueryContext) // tsc workaround

interface IBlog {
  data: BlogQuery
}

export default ({ data }: IBlog): JSX.Element => {
  const [searchResult, setSearchResult] = useState<Set<string>>(new Set<string>())
  const [isSearching, setSearching] = useState<boolean>(false)
  const [index] = useState<Index<any>>(Index.load(data.siteSearchIndex?.index))

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
    (queryContext as IQueryContext).isSearching ? (queryContext as IQueryContext).searchResult.has(node.id) : true
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
  searchIndex: Maybe<Scalars["SiteSearchIndex_Index"]>
  className?: string
}

const UnstyledOptions = ({ className, searchIndex }: IOptions): JSX.Element => (
  <section className={className}>
    <Searchbar searchIndex={searchIndex as Maybe<Scalars["SiteSearchIndex_Index"]>} />
  </section>
)

const Options = styled(UnstyledOptions)`
  display: flex;
  width: 100%;
  height: 56px;
  margin-bottom: 32px;
  background-color: ${(props): string => "#181818"};
`

interface ISearchBar {
  searchIndex: Maybe<Scalars["SiteSearchIndex_Index"]>
}

const Searchbar = ({ searchIndex }: ISearchBar): JSX.Element => {
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
    <input
      type="search"
      value={value}
      name="search"
      onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setValue(e.target.value)}
    />
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
  title?: string
  description?: string
  date?: string
  slug?: string
  className?: string
  featuredImage: FluidObject | null
  tags?: string[]
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
