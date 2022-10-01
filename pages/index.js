import Link from '@/components/Link'
import ProfileCard from '@/components/ProfileCard'
import { PageSeo } from '@/components/SEO'
import Tag from '@/components/Tag'
import Twemoji from '@/components/Twemoji.js'
import TypedBios from '@/components/TypedBios'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import useTranslation from 'next-translate/useTranslation'

const MAX_DISPLAY = 5

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home({ posts, locale, availableLocales }) {
  const headingColorClass =
    'bg-gradient-to-r from-yellow-600 to-red-600 dark:bg-gradient-to-l dark:from-emerald-500 dark:to-lime-600'

  const { t } = useTranslation()

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
              className={`mb-8 text-4xl leading-[60px] font-extrabold tracking-tight text-transparent bg-clip-text ${headingColorClass} md:text-6xl md:leading-[86px]`}
            >
              {t('common:fellow')} <i className="twa twa-waving-hand"></i>
            </p>

            <div className="text-lg leading-8 text-gray-600 dark:text-gray-400">
              <h1 className="text-neutral-900 dark:text-neutral-200">
                {t('common:im')} <span className="font-medium">Muhammad Iqbal</span> -{' '}
                <span className="font-medium">Software Engineer</span> {t('common:from')} Indonesia{' '}
                <span className="font-medium hidden">{t('common:province')}, ID</span>
                <span className="align-middle flag-vn">
                  <Twemoji emoji="flag-indonesia" />
                </span>
              </h1>
              <TypedBios t={t} />
              <p className="mt-4 mb-8">
                {t('common:bio1')}
                <br />
                {t('common:bio2')}
                <br />
                {t('common:bio3')}
                <br />
                {t('common:bio4')}
              </p>
              <div className="flex flex-col">
                <Link href="/blog" className="hover:underline">
                  <Twemoji emoji="memo" /> {t('common:writings')}
                </Link>
                <Link href="/snippets" className="hover:underline">
                  <Twemoji emoji="dna" /> {t('common:snippets')}
                </Link>
                <Link href="/about" className="hover:underline">
                  <Twemoji emoji="face-with-monocle" /> {t('common:about')}
                </Link>
                <Link href="/resume" className="hover:underline">
                  <Twemoji emoji="briefcase" /> {t('common:resume')}
                </Link>
              </div>
              <p className="my-8">
                {t('common:reading')} <Twemoji emoji="clinking-beer-mugs" />
              </p>
            </div>
          </div>
          <div className="hidden xl:block">
            <ProfileCard />
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <ul className="pt-2 divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && ''}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={date}>{formatDate(date)}</time>
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-3xl font-bold mb-1 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
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
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="all posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
