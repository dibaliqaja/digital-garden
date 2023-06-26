import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'
import FourZeroFour from './404'

const DEFAULT_LAYOUT = 'ResumeLayout'

export async function getStaticProps() {
  const resumeDetails = await getFileBySlug('authors', ['resume'])
  return { props: { resumeDetails } }
}

export default function About({ resumeDetails }) {
  return <FourZeroFour />
  // const { mdxSource, frontMatter } = resumeDetails

  // return (
  //   <MDXLayoutRenderer
  //     layout={frontMatter.layout || DEFAULT_LAYOUT}
  //     mdxSource={mdxSource}
  //     frontMatter={frontMatter}
  //   />
  // )
}
