import PageTitle from '@/components/PageTitle'
import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { formatSlug, getFileBySlug, getFiles } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'PostSimple'

export async function getStaticPaths({ locales, defaultLocale }) {
  const localesSnippets = locales
    .map((locale) => {
      const otherLocale = locale !== defaultLocale ? locale : ''
      const snippets = getFiles('snippets', otherLocale)
      return snippets.map((post) => [post, locale])
    })
    .flat()

  return {
    paths: localesSnippets.map(([p, l]) => ({
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
  const snippet = await getFileBySlug('snippets', params.slug.join('/'), otherLocale)

  return { props: { snippet } }
}

export default function Snippet({ snippet, availableLocales }) {
  const { mdxSource, frontMatter } = snippet

  return (
    <>
      {frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={frontMatter.layout || DEFAULT_LAYOUT}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
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
