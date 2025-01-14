import Layout from 'components/app/layout'
import {getOgImage} from 'utils/get-og-image'
import {PrimaryNewsletterCta} from 'components/primary-newsletter-cta'

const NewsletterPage = () => {
  const title = 'Newsletter'

  return (
    <Layout meta={{title}} className="w-full">
      <main className="w-full mx-auto">
        <PrimaryNewsletterCta />
      </main>
    </Layout>
  )
}

export default NewsletterPage
