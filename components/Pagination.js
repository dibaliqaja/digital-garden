import Link from '@/components/Link'
import useTranslation from 'next-translate/useTranslation'

export default function Pagination({ totalPages, currentPage }) {
  const { t } = useTranslation()
  const prevPage = parseInt(currentPage) - 1 > 0
  const nextPage = parseInt(currentPage) + 1 <= parseInt(totalPages)
  const buttonStyle =
    'rounded py-1 px-1 font-medium text-gray-900 sm:py-2 sm:px-3 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'

  return (
    <div className="pt-6 pb-8 space-y-2 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button rel="previous" className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            {t('common:prevp')}
          </button>
        )}
        {prevPage && (
          <Link href={currentPage - 1 === 1 ? `/blog/` : `/blog/page/${currentPage - 1}`}>
            <button rel="previous" className={buttonStyle}>
              {t('common:prevp')}
            </button>
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button rel="next" className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            {t('common:nextp')}
          </button>
        )}
        {nextPage && (
          <Link href={`/blog/page/${currentPage + 1}`}>
            <button rel="next" className={buttonStyle}>
              {t('common:nextp')}
            </button>
          </Link>
        )}
      </nav>
    </div>
  )
}
