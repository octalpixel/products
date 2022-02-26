import * as React from 'react'
import Layout from '../components/layout'
import PopupSubscribeForm from '@skillrecordings/convertkit/dist/forms/popup'
import config from 'config'

type ArticleTemplateProps = {
  meta?: any
}

const ArticleTemplate: React.FC<ArticleTemplateProps> = ({meta, children}) => {
  const {headline} = meta

  return (
    <Layout meta={meta}>
      <article>
        <header>
          {headline && (
            <h1 className="lg:text-8xl md:text-6xl text-5xl font-extrabold tracking-tight leading-tight text-center  py-32">
              {headline}
            </h1>
          )}
        </header>
        <main className="prose dark:prose-dark lg:prose-xl prose-lg mx-auto py-32 max-w-screen-md">
          {children}
        </main>
        <footer className="mx-auto max-w-screen-md border-t dark:border-gray-800 border-gray-200 py-16">
          by{' '}
          {meta.contributors
            ? meta.contributors[0].name
            : config.additionalMetaTags[0].content}
        </footer>
      </article>
      <PopupSubscribeForm peakingContent={'Hello!'} />
    </Layout>
  )
}

export default ArticleTemplate