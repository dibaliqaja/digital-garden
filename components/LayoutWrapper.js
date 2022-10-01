import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Twemoji from '@/components/Twemoji.js'
import NextImage from 'next/image'
import { useState } from 'react'

import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

const LayoutWrapper = ({ children }) => {
  const [navShow, setNavShow] = useState(false)
  const onToggleNav = () => setNavShow((status) => !status)

  const { t } = useTranslation()
  const router = useRouter()
  const { locale, locales, defaultLocale } = router
  // const lang = [
  //   {option: '🇮🇩': value: 'id'},
  //   {option: '🇬🇧': value: 'en'}
  // ];

  const changeLanguage = (e) => {
    const locale = e.target.value
    router.push(router.asPath, router.asPath, { locale })
  }

  return (
    <>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
      <header className="overflow-x-hidden backdrop-blur supports-backdrop-blur:bg-white/95 py-3 sticky top-0 z-40 bg-white/75 dark:bg-dark/75">
        <div className="mx-auto max-w-3xl xl:max-w-5xl flex items-center justify-between px-3 xl:px-0">
          <div>
            <Link href="/" aria-label="Iqbal's Blog">
              <div className="flex items-center justify-between">
                <div className="mr-3 flex justify-center items-center">
                  <NextImage
                    src="/static/images/logo.png"
                    width="45px"
                    height="45px"
                    className="rounded-full"
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 sm:p-4 dark:text-gray-100"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <select
              onChange={changeLanguage}
              defaultValue={locale}
              style={{ textAlignLast: 'center' }}
              className="text-gray-900 dark:text-gray-100 text-shadow-sm text-sm bg-transparent tracking-wide"
            >
              {locales.map((e) => (
                <option value={e} key={e} className="font-medium text-black">
                  {e}
                </option>
              ))}
            </select>
            <ThemeSwitch />
            <button
              className="w-8 h-8 ml-2 mr-1 rounded sm:hidden"
              type="button"
              aria-label="Toggle Menu"
              onClick={onToggleNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-gray-900 dark:text-gray-100"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-3xl px-3 xl:px-0 mx-auto sm:px-6 xl:max-w-5xl">
        <div className="flex flex-col justify-between min-h-screen">
          <main className="mb-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export default LayoutWrapper
