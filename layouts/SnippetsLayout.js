import SnippetCard from '@/components/SnippetCard'
import useTranslation from 'next-translate/useTranslation'

export default function SnippetsLayout({ title, snippets, availableLocales }) {
  const { t } = useTranslation()

  return (
    <>
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {t('common:snippets_desc')}
          </p>
        </div>
        <div className="container py-12">
          <div className="lg:grid grid-cols-2 gap-6">
            {snippets.map((snippet) => (
              <SnippetCard key={snippet.title} snippet={snippet} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
