import React from 'react'
import {Button} from '@skillrecordings/react'
import {useCopyToClipboard} from 'react-use'
import toast from 'react-hot-toast'

const CopyInviteLink: React.FC<
  React.PropsWithChildren<{bulkCouponId: string}>
> = ({bulkCouponId}) => {
  const [_, setCopied] = useCopyToClipboard()
  const inviteLink = `${process.env.NEXT_PUBLIC_URL}?code=${bulkCouponId}`

  return (
    <>
      <label className="sr-only font-semibold" htmlFor="inviteLink">
        Invite Share Link
      </label>
      <div className="flex gap-3 pt-2">
        <input
          readOnly
          className="w-full rounded-md border border-gray-300 bg-gray-50 py-2 px-3 text-sm font-semibold text-gray-700 shadow-inner selection:bg-green-500 selection:text-white"
          id="inviteLink"
          onClick={(e) => {
            e.currentTarget.select()
          }}
          value={inviteLink}
        />
        <Button
          type="button"
          onClick={() => {
            setCopied(inviteLink)
            toast.success('Copied')
          }}
          className="flex flex-shrink-0 items-center gap-1 rounded-md border bg-gray-100 px-5 py-2 text-sm font-semibold transition hover:bg-gray-200/80"
        >
          Copy Link
        </Button>
      </div>
    </>
  )
}

export default CopyInviteLink