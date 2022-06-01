import Script from 'next/script'

import siteMetadata from '@/data/siteMetadata'

const UmamiScript = () => {
  return (
    <>
      <Script
        async
        defer
        data-website-id={siteMetadata.analytics.umamiWebsiteId}
        src="https://umami-garden.vercel.app/umami.js" // Replace with your umami instance
      />
    </>
  )
}

export default UmamiScript
