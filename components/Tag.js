import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-lg font-medium dark:text-primary-400 text-primary-600 hover:text-gray-900 dark:hover:text-white">
        #{text.split(' ').join('-')}
      </a>
    </Link>
  )
}

export default Tag
