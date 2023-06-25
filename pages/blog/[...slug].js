import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getAllFilesFrontMatter, getFileBySlug, getFiles } from '@/lib/mdx'
import { POSTS_PER_PAGE } from 'pages/blog'

const DEFAULT_LAYOUT = 'PostLayout'

export async function getStaticPaths({ locales, defaultLocale }) {
  const localesPost = locales
    .map((locale) => {
      const otherLocale = locale !== defaultLocale ? locale : ''
      const posts = getFiles('blog', otherLocale)
      return posts.map((post) => [post, locale])
    })
    .flat()

  return {
    paths: localesPost.map(([p, l]) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
      locale: l,
    })),
    fallback: false,
  }
}

export async function getStaticProps({ locale, defaultLocale, locales, params }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const allPosts = await getAllFilesFrontMatter('blog', otherLocale)
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === params.slug.join('/'))
  const prev = allPosts[postIndex + 1] || null
  const next = allPosts[postIndex - 1] || null
  const page = Math.ceil((postIndex + 1) / POSTS_PER_PAGE)
  const post = await getFileBySlug('blog', params.slug.join('/'), otherLocale)
  const authorList = post.frontMatter.authors || ['default']
  const authorPromise = authorList.map(async (author) => {
    const authorResults = await getFileBySlug('authors', [author], otherLocale)
    return authorResults.frontMatter
  })
  const authorDetails = await Promise.all(authorPromise)

  // rss
  const rss = generateRss(allPosts, locale, defaultLocale)
  fs.writeFileSync(`./public/feed${otherLocale === '' ? '' : `.${otherLocale}`}.xml`, rss)

  // Checking if available in other locale for SEO
  const availableLocales = []
  await locales.forEach(async (ilocal) => {
    const otherLocale = ilocal !== defaultLocale ? ilocal : ''
    const iAllPosts = await getAllFilesFrontMatter('blog', otherLocale)
    iAllPosts.map((ipost) => {
      if (ipost.slug === post.frontMatter.slug && ipost.slug !== '') availableLocales.push(ilocal)
    })
  })

  return { props: { post, authorDetails, prev, next, availableLocales } }
}

export default function Blog({ post, authorDetails, prev, next, page, availableLocales }) {
  const { mdxSource, frontMatter } = post

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          authorDetails={authorDetails}
          prev={prev}
          next={next}
          page={page}
          availableLocales={availableLocales}
        />
      ) : (
        <div className="mt-24 text-center">
          <PageTitle>
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
            <p className="mt-10">Under Construction</p>
          </PageTitle>
        </div>
      )}
    </>
  )
}
