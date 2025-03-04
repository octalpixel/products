import React from 'react'
import {AppProps} from 'next/app'
import {Session} from 'next-auth'
import '../styles/globals.css'
import 'focus-visible'
import {ConvertkitProvider} from '@skillrecordings/skill-lesson/hooks/use-convertkit'
import {usePageview} from '@skillrecordings/analytics'
import {DefaultSeo} from '@skillrecordings/next-seo'
import {initNProgress} from '@skillrecordings/react'
import config from '../config'
import Script from 'next/script'
import {MDXProvider} from '@mdx-js/react'
import {MDXComponents} from 'components/mdx'
import {SessionProvider} from 'next-auth/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import * as amplitude from '@amplitude/analytics-browser'
import {FeedbackProvider} from 'feedback-widget/feedback-context'

import {trpc} from 'trpc/trpc.client'

amplitude.init(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY)

const queryClient = new QueryClient()

function MyApp({Component, pageProps}: AppProps<{session: Session}>) {
  usePageview()
  initNProgress()
  return (
    <>
      <DefaultSeo {...config} />
      <FeedbackProvider>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <QueryClientProvider client={queryClient}>
            <ConvertkitProvider>
              <MDXProvider components={MDXComponents}>
                <Component {...pageProps} />
              </MDXProvider>
            </ConvertkitProvider>
          </QueryClientProvider>
        </SessionProvider>
      </FeedbackProvider>
      {process.env.NODE_ENV !== 'development' && (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          ></Script>
          <Script id="google-inline">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
        `}
          </Script>
        </>
      )}
    </>
  )
}

export default trpc.withTRPC(MyApp)
