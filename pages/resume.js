import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'ResumeLayout'

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const resumeDetails = await getFileBySlug('authors', ['resume'], otherLocale)
  return { props: { resumeDetails, availableLocales: locales } }
}

export default function About({ resumeDetails, availableLocales }) {
  const { mdxSource, frontMatter } = resumeDetails

  return (
    <MDXLayoutRenderer
      layout={frontMatter.layout || DEFAULT_LAYOUT}
      mdxSource={mdxSource}
      frontMatter={frontMatter}
      availableLocales={availableLocales}
    />
  )
}
