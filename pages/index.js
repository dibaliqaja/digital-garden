import Link from '@/components/Link'
import ProfileCard from '@/components/ProfileCard'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import Twemoji from '@/components/Twemoji.js'
import TypedBios from '@/components/TypedBios'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'

const MAX_DISPLAY = 5

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const headingColorClass =
    'bg-gradient-to-r from-yellow-600 to-red-600 dark:bg-gradient-to-l dark:from-emerald-500 dark:to-lime-600'
  return (
    <>
      <PageSeo
        title={siteMetadata.title}
        description={siteMetadata.description}
        keywords={siteMetadata.keywords}
        google={siteMetadata.google}
      />
      <div className="divide-y divide-gray-200 dark:divide-gray-700 mt-8 md:mt-16">
        <div className="my-4 pt-6 pb-8 space-y-2 md:space-y-5 xl:grid xl:grid-cols-3">
          <div className="xl:col-span-2 pr-8">
            <p
              className={`mb-8 text-4xl leading-[60px] font-extrabold tracking-tight text-transparent bg-clip-text ${headingColorClass} md:text-7xl md:leading-[86px]`}
            >
              Howdy, fellow! <i className="twa twa-waving-hand"></i>
            </p>

            <div className="text-lg leading-8 text-gray-600 dark:text-gray-400">
              <h1 className="text-neutral-900 dark:text-neutral-200">
                I'm <span className="font-medium">Muhammad Iqbal</span> - a{' '}
                <span className="font-medium">Software Engineer</span> from Indonesia{' '}
                <span className="font-medium hidden">East Java, ID</span>
                <span className="align-middle flag-vn">
                  <Twemoji emoji="flag-indonesia" />
                </span>
              </h1>
              <TypedBios />
              <p className="mt-4 mb-8">
                I started my coding journey in late 2017 with C/C++/Java in college
                <br />
                I had my first job as a PHP coding mentor in 2019 at vocational high school
                <br />
                I'm in love with the Web Ecosystem and Web Development
                <br />
                I'm writing this blog to note down and share what I've learned as a SE
              </p>
              <div className="flex flex-col space-y-3">
                <Link href="/blog" className="hover:underline underline-offset-8">
                  <Twemoji emoji="memo" />
                  <span className="ml-2">My writings</span>
                </Link>
                <Link href="/snippets" className="hover:underline underline-offset-8">
                  <Twemoji emoji="dna" />
                  <span className="ml-2">Useful snippets</span>
                </Link>
                <Link href="/about" className="hover:underline underline-offset-8">
                  <Twemoji emoji="face-with-monocle" />
                  <span className="ml-2">More about me</span>
                </Link>
                <Link href="/resume" className="hover:underline underline-offset-8">
                  <Twemoji emoji="briefcase" />
                  <span className="ml-2">My resume</span>
                </Link>
              </div>
              <p className="my-8">
                Happy reading <Twemoji emoji="clinking-beer-mugs" />
              </p>
            </div>
          </div>
          <div className="hidden xl:block">
            <ProfileCard />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <ul className="pt-3 divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && 'No posts found.'}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-lg font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-3xl font-bold tracking-tight mb-3">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-500"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-center leading-6">
            <Link
              href="/blog"
              className="inline mt-7 mb-7 px-6 py-4 text-xl font-medium leading-3 text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg shadow focus:outline-none focus:shadow-outline-blue hover:bg-blue-700 dark:hover:bg-blue-500"
              aria-label="all posts"
            >
              All Posts
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
