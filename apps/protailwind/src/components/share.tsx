import {HeartIcon} from '@heroicons/react/solid'
import {
  Twitter,
  LinkedIn,
  Reddit,
  Facebook,
  CopyToClipboard,
} from '@skillrecordings/react'
import {useRouter} from 'next/router'
import toast from 'react-hot-toast'

const Share: React.FC<{title: string}> = ({title}) => {
  const router = useRouter()
  const url = process.env.NEXT_PUBLIC_URL + router.asPath
  const shareButtonClassName =
    'w-full flex items-center justify-center px-7 py-8 hover:bg-gray-50 transition'

  return (
    <div className="mx-auto mb-16 flex max-w-screen-md items-center justify-center overflow-hidden bg-white pl-5 pt-10 shadow-2xl shadow-gray-400/20 sm:pt-0 md:rounded-lg">
      <div className="mx-auto flex w-full max-w-screen-md flex-col items-center justify-between gap-5 sm:flex-row">
        <div>
          <p className="flex items-center text-lg font-medium">
            <HeartIcon
              aria-hidden="true"
              className="mr-2 inline-block h-5 w-5 flex-shrink-0 text-brand-red"
            />
            <span className="leading-none">
              Share this article with your friends
            </span>
          </p>
        </div>
        <div className="flex w-full items-center justify-center divide-gray-100 pt-2 sm:w-auto sm:divide-x  sm:pt-0">
          <Twitter
            className={shareButtonClassName}
            svgClassName="sm:w-5 sm:h-5 w-4 h-4"
            link={url}
            message={`${title} by @${process.env.NEXT_PUBLIC_PARTNER_TWITTER}`}
          />
          <Facebook className={shareButtonClassName} link={url} />
          <LinkedIn className={shareButtonClassName} link={url} />
          <Reddit className={shareButtonClassName} link={url} />
          <CopyToClipboard
            className={shareButtonClassName}
            onSuccess={() => {
              toast.success('Copied to clipboard')
            }}
            link={url}
          />
        </div>
      </div>
    </div>
  )
}

export default Share
