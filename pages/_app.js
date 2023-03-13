import '@/css/tailwind.css'
import '@/css/twemoji.css'
import '@/css/timeline.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

// import Analytics from '@/components/analytics'
import { Analytics } from '@vercel/analytics/react'
import LayoutWrapper from '@/components/LayoutWrapper'

import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.configure({ showSpinner: false }))
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={'dark'}>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <Analytics />
      <LayoutWrapper>
        <Component {...pageProps} />
      </LayoutWrapper>
    </ThemeProvider>
  )
}
